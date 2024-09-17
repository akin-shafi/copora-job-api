import { Request, Response } from 'express';
import { ReferenceService } from '../services/ReferenceService';
import { UserService } from '../services/UserService';

export class ReferenceController {
    // Create or update Reference
    static async createOrUpdateReference(req: Request, res: Response) {
        try {
            const { applicationNo, employerName, contactName, phone, email, address } = req.body;
    
            // Validate required fields
            if (!applicationNo) {
                return res.status(400).json({ statusCode: 400, message: 'Application number is required' });
            }
    
            if (!phone) {
                return res.status(400).json({ statusCode: 400, message: 'Reference contact phone is required' });
            }
    
            // Check if applicant exists
            const existingApplicant = await UserService.findApplicationNo(applicationNo);
            if (!existingApplicant) {
                return res.status(400).json({ statusCode: 400, message: 'Applicant does not exist' });
            }
    
            // Check if reference already exists by phone number
            const existingReference = await ReferenceService.findByApplicationNoAndPhone(applicationNo, phone);
    
            let result;
            if (existingReference) {
                // Update existing reference
                result = await ReferenceService.update(existingReference.id, {
                    applicationNo,
                    employerName,
                    contactName,
                    phone,
                    email,
                    address
                });
            } else {
                // Create new reference
                result = await ReferenceService.create({
                    applicationNo,
                    employerName,
                    contactName,
                    phone,
                    email,
                    address
                });
            }
    
            return res.status(201).json({
                message: 'Reference details processed successfully',
                data: result
            });
    
        } catch (error) {
            console.error('Error creating or updating reference details:', error);
            res.status(500).json({ message: 'Error creating or updating reference details', error: error.message });
        }
    }
    

    // Get Reference by applicationNo
    static async getReferenceByNo(req: Request, res: Response) {
        try {
            const { applicationNo } = req.params;
            const reference = await ReferenceService.getByApplicationNo(applicationNo);
            if (!reference) {
                return res.status(404).send({ message: 'Reference not found' });
            }
            res.status(200).send(reference);
        } catch (error) {
            res.status(500).send({ message: 'Error fetching reference', error: error.message });
        }
    }

    // Update Reference by applicationNo
    static async updateReferenceByNo(req: Request, res: Response) {
        try {
            const { applicationNo } = req.params;
            
            const updatedReference = await ReferenceService.updateByApplicationNo(applicationNo, req.body);
            if (!updatedReference) {
                return res.status(404).send({ message: 'Reference not found' });
            }
            res.status(200).send({ message: 'Reference created successfully', data: updatedReference});
        } catch (error) {
            res.status(400).send({ message: 'Error updating reference', error: error.message });
        }
    }

    // Delete Reference by applicationNo
    static async deleteReferenceByNo(req: Request, res: Response) {
        try {
            const { applicationNo } = req.params;
            const message = await ReferenceService.deleteByApplicationNo(applicationNo);
            res.status(200).send({ message });
        } catch (error) {
            res.status(404).send({ message: error.message });
        }
    }
}
