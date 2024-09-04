import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entities/UserEntity';
import { UserService } from '../services/UserService';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { v2 as cloudinary } from 'cloudinary';
import { sendInvitationToOnboard, sendResetPasswordEmail, sendTwoFactorCodeEmail, sendVerificationEmail } from '../lib/emailActions';
import { v4 as uuidv4 } from 'uuid'; // For generating verification tokens
import { BASE_URL } from '../config';
 

const userService = new UserService();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

class UserController {

  constructor() {
    this.register = this.register.bind(this);
  }

  async register(req: Request, res: Response): Promise<Response> {
    try {
      const { firstName, middleName, lastName, email, password, role, accountStatus, createdBy } = req.body;

      // Validate required fields
      if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: 'Required fields are missing' });
      }

      if (!createdBy) {
        return res.status(400).json({ message: 'Created By field is missing' });
      }

      const normalizedEmail = email.trim().toLowerCase();

      // Check if the user already exists
      const existingUser = await userService.findByEmail(normalizedEmail);
      if (existingUser) {
        return res.status(400).json({ message: 'User with this email already exists' });
      }

      // Generate application number
      const applicationNo = await this.generateApplicationNumber(role);

      // Upload profile picture if present
      const profilePictureUrl = await this.uploadProfilePicture(req.file);

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const verificationToken = uuidv4();
      const newUser = await userService.create({
        firstName,
        middleName,
        lastName,
        email: normalizedEmail,
        password: hashedPassword,
        profilePicture: profilePictureUrl,
        role,
        createdBy,
        accountStatus,
        verificationToken,
        applicationNo // Save the generated application number
      });

      // Send relevant email based on creator
      await this.sendRelevantEmail(createdBy, { email: normalizedEmail, firstName, password, role, verificationToken });

      return res.status(201).json({
        message: `${role} registered successfully and an email has been sent.`
      });

    } catch (error) {
      console.error('Error during registration:', error);
      return !res.headersSent
        ? res.status(500).json({ message: 'Server error', error: error.message })
        : undefined;
    }
  }

  private async generateApplicationNumber(role: string): Promise<string> {
    const prefix = role === 'admin' ? 'ADM' : 'APP';
    const uniqueId = uuidv4().slice(0, 8).toUpperCase(); // Unique part of the application number
    return `${prefix}-${uniqueId}`;
  }

  private async uploadProfilePicture(file: Express.Multer.File | undefined): Promise<string> {
    if (!file) return '';

    try {
      const result = await cloudinary.uploader.upload(file.path);
      return result.secure_url;
    } catch (uploadError) {
      console.error('Error uploading profile picture:', uploadError);
      throw new Error('Failed to upload profile picture');
    }
  }

  private async sendRelevantEmail(createdBy: string, { email, firstName, password, role, verificationToken }: any): Promise<void> {
    try {
      if (createdBy === 'admin' && role === 'admin') {
        await sendVerificationEmail({ email, firstName, temporaryPassword: password },  verificationToken);
      } else {
        await sendInvitationToOnboard({
          email,
          firstName,
          loginLink: `${BASE_URL}/login`,
          temporaryPassword: password
        });
        
      }
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      throw new Error('Failed to send email');
    }
  }

  async forgetPassword(req: Request, res: Response) {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ 
                statusCode: 400,
                message: 'Email is required' 
            });
        }

        const normalizedEmail = email.trim().toLowerCase();
        const user = await userService.findByEmail(normalizedEmail);

        if (!user) {
            return res.status(404).json({ 
                statusCode: 404,
                message: 'User not found' 
            });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour from now
        await userService.updateData(user);

        await sendResetPasswordEmail({ email: user.email, firstName: user.firstName }, resetToken);

        res.status(200).json({ 
            statusCode: 200,
            message: 'Password reset email sent' 
        });
    } catch (error) {
        console.error('Error during forget-password:', error);
        res.status(500).json({ 
            statusCode: 500,
            message: 'Server error', 
            error: error.message 
        });
    }
  }

  async resetPassword(req: Request, res: Response) {
    try {
      const { token, newPassword } = req.body;

      if (!token || !newPassword) {
        return res.status(400).json({ message: 'Token and new password are required' });
      }

      const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

      const user = await userService.findByResetToken(hashedToken);
      if (!user || user.resetPasswordExpires < new Date()) {
        return res.status(400).json({ message: 'Invalid or expired token' });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      user.resetPassword = true;
      user.resetPasswordToken = null;
      user.resetPasswordExpires = null;
      user.accountStatus = true;
      await userService.updateData(user);

      res.status(200).json({ statusCode: 200, message: 'Password has been reset successfully' });
    } catch (error) {
      console.error('Error during reset-password:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  async toggleTwoFactor(req: Request, res: Response) {
    try {
      const { userId } = req.body;

      if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
      }

      const user = await userService.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (user.twoFactorEnabled) {
        // Disable 2FA
        user.twoFactorEnabled = false;
        user.twoFactorToken = null;
        user.twoFactorExpires = null;
        await userService.updateData(user);
        res.status(200).json({ message: 'Two-factor authentication has been disabled' });
      } else {
        // Enable 2FA
        const twoFactorToken = Math.floor(100000 + Math.random() * 900000).toString();
        const hashedToken = crypto.createHash('sha256').update(twoFactorToken).digest('hex');

        user.twoFactorToken = hashedToken;
        user.twoFactorExpires = new Date(Date.now() + 300000); // 5 minutes from now
        user.twoFactorEnabled = true;
        await userService.updateData(user);

        await sendTwoFactorCodeEmail({ email: user.email, firstName: user.firstName }, twoFactorToken);
        res.status(200).json({ message: 'Two-factor authentication has been enabled. A verification code has been sent to your email.' });
      }
    } catch (error) {
      console.error('Error toggling two-factor authentication:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
  async generateTwoFactorToken(req: Request, res: Response) {
    try {
      const { email, loginType } = req.body;
  
      if (!email) {
        return res.status(400).json({ message: 'User email is required' });
      }
  
      // Find the user by email
      const user = await userService.findByEmail(email);
      console.log(user);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const userId = user.id;
  
      // Generate and send the two-factor token
      await userService.generateAndSendTwoFactorToken(userId, loginType);
  
      res.status(200).json({ message: 'Two-factor authentication token sent' });
    } catch (error) {
      console.error('Error generating two-factor token:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
  

  async login(req: Request, res: Response) {
    try {
        const secret = process.env.JWT_SECRET || 'your-secret-key';
        const userRepository = AppDataSource.getRepository(User);
        const { email, password } = req.body;

        // Find user by email
        const user = await userRepository.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ statusCode: 400, message: 'Invalid email or password' });
        }

        // Check if password is correct
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ statusCode: 400, message: 'Invalid email or password' });
        }

        // Check if user email is verified
        // if (!user.isVerified) {
        //     return res.status(400).json({ statusCode: 400, message: 'Email is not verified' });
        // }

        // Check if user account is active
        if (!user.accountStatus) {
          return res.status(401).json({ statusCode: 401, message: 'Account is not active' });
        }        
        

        // Check if two-factor authentication is enabled
        if (user.twoFactorEnabled) {
          const loginType = "password-base";
          // Generate and send two-factor token
          await userService.generateAndSendTwoFactorToken(user.id, loginType);
          return res.status(202).json({ statusCode: 202, message: 'Two-factor is enabled authentication token sent' });
        }

        // Ensure JWT secret is defined
        if (!secret) {
            throw new Error('JWT secret key is not defined');
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.id, role: user.role }, secret, { expiresIn: '1h' });

        // Respond with token and user info
        res.status(200).json({
            statusCode: 200,
            token,
            user: {
                userId: user.id,
                role: user.role,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                resetPassword: user.resetPassword,
                onboardingStep: user.onboardingStep,
                applicationNo: user.applicationNo,
                profilePicture: user?.profilePicture,
            },
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ statusCode: 500, message: 'Server error', error: error.message });
    }
  }

 

  async verifyTwoFactorCode(req: Request, res: Response) {
    try {
      const { email, twoFactorCode } = req.body;
      console.log(email, twoFactorCode)
  
      if (!email || !twoFactorCode) {
        return res.status(400).json({ statusCode: 400, message: 'User email and two-factor code are required' });
      }
  
      const user = await userService.findOneAndUpdate(
        { email, twoFactorToken: twoFactorCode, twoFactorExpires: new Date() },
        { twoFactorToken: null, twoFactorExpires: null },
        { returnNewDocument: true }
      );
  
      if (!user) {
        return res.status(400).json({ statusCode: 400, message: 'User not found or invalid two-factor code' });
      }
  
      const secret = process.env.JWT_SECRET || 'your-secret-key';
      if (!secret) {
        throw new Error('JWT secret key is not defined');
      }
  
      const token = jwt.sign({ userId: user.id, role: user.role }, secret, { expiresIn: '1h' });
  
      res.status(200).json({
        statusCode: 200,
        token,
        user: {
          userId: user.id,
          role: user.role,
          firstName: user.firstName,
          middleName: user.middleName,
          lastName: user.lastName,
          email: user.email,
        },
      });
    } catch (error) {
      console.error('Error verifying two-factor code:', error);
      res.status(500).json({ statusCode: 500, message: 'Server error', error: error.message });
    }
  }

  async updateProfile(req: Request, res: Response) {
    try {
      const userRepository = AppDataSource.getRepository(User);
      const { userId } = req.params;
      const { firstName, middleName, lastName, country, stateOrProvince, postalCode, city, email, phoneNumber } = req.body;
      const file = req.file;

      const user = await userRepository.findOneBy({ id: parseInt(userId, 10) });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (file) {
        const result = await cloudinary.uploader.upload(file.path);
        user.profilePicture = result.secure_url;
        console.log('Uploaded profile picture to Cloudinary:', user.profilePicture);
      }

      if (firstName !== undefined) user.firstName = firstName;
      if (middleName !== undefined) user.middleName = middleName;
      if (lastName !== undefined) user.lastName = lastName;
      if (email !== undefined) user.email = email;

      await userRepository.save(user);

      res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  async getUserProfile(req: Request, res: Response) {
    try {
      const userId = req.body?.id; // Access the userId from req.user
      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized: No user ID found' });
      }
  
      const user = await userService.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({
        user: {
          userId: user.id,
          role: user.role,
          firstName: user.firstName,
          middleName: user.middleName,
          lastName: user.lastName,
          email: user.email,
          accountStatus: user.accountStatus,
        },
      });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  async changeUserRole(req: Request, res: Response) {
    const userId = parseInt(req.params.userId, 10); // Convert string to number
    const { role } = req.body;

    try {
        // Validate input
        if (isNaN(userId) || !role) {
            return res.status(400).json({ message: 'User ID (number) and role are required' });
        }

        // Validate role
        const allowedRoles = ['admin', 'user', 'manager']; // Adjust roles as necessary
        if (!allowedRoles.includes(role)) {
            return res.status(400).json({ message: 'Invalid role' });
        }

        // Update user role
        const updatedUser = await userService.updateUserRole(userId, role);

        if (updatedUser) {
            return res.status(200).json({ message: 'User role updated successfully', user: updatedUser });
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error updating user role:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
  
  // Update onboarding step controller
  async updateOnboardingStep(req: Request, res: Response) {
      const { applicationNo, onboardingStep } = req.body;
      const userRepository = AppDataSource.getRepository(User);
      try {
          // Validate input
          if (!applicationNo || onboardingStep === undefined) {
              return res.status(400).json({
                  message: "Application number and onboarding step are required",
              });
          }

          // Find the user by application number
          const user = await UserService.findApplicationNo(applicationNo);

          if (!user) {
              return res.status(404).json({
                  message: "User not found",
              });
          }

          // Update the onboarding step
          user.onboardingStep = onboardingStep;

          // Save the updated user
          const updatedUser = await userRepository.save(user);

          return res.status(200).json({
              statusCode: 200,
              message: "Onboarding step updated successfully",
              onboardingStep: updatedUser.onboardingStep,
          });
      } catch (error) {
          console.error("Error updating onboarding step:", error);
          return res.status(500).json({
              message: "Server error",
              error: error.message,
          });
      }
  };
  // Get all users
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const users = await userService.getAll();
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  // Get user by ID
  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const userId = parseInt(req.params.id, 10);
      const user = await userService.getById(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  // Create new user
 

  

  // Update user
  async update(req: Request, res: Response): Promise<Response> {
    try {
      const userId = parseInt(req.params.id, 10);
      const userData = req.body;
      const updatedUser = await userService.update(userId, userData);

      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  // Delete user
  async delete(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.id, 10);
      await userService.delete(userId);
      res.status(204).send(); // No content
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  async verifyEmail(req: Request, res: Response): Promise<Response> {
    const verifyToken = req.query.token as string;

    if (!verifyToken) {
      return res.status(400).json({ message: 'Verification token is missing' });
    }

    try {
      const user = await userService.findByVerificationToken(verifyToken);
      if (!user) {
        return res.status(400).json({ message: 'Invalid or expired verification token' });
      }

      // Check if the user is already verified
      if (user.isVerified) {
        return res.status(200).json({ message: 'Email is already verified' });
      }

      // Proceed with verification
      user.isVerified = true; // Assume there's a field to mark user as verified
      user.verificationToken = null; // Clear the verification token
      await userService.updateData(user);

      return res.status(200).json({ message: 'Email verified successfully. You can now log in.' });
    } catch (error) {
      console.error('Error during email verification:', error);
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  }


}

export default new UserController();
