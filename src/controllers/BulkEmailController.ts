import { Request, Response } from 'express';
import { sendEmailsInBatches } from '../lib/emailActions'; // Utility for sending bulk emails in batches

class BulkEmailController {
  constructor() {
    this.sendBulkEmail = this.sendBulkEmail.bind(this);
  }

  /**
   * Sends bulk emails to users based on filters like onboardingStatus and state.
   */
  async sendBulkEmail(req: Request, res: Response): Promise<Response> {
    try {
      const { emails, customSubject, customContent } = req.body;

      // Validate the required fields
      if (!emails || !Array.isArray(emails) || emails.length === 0) {
        return res.status(400).json({ message: 'Emails array is required and should not be empty.' });
      }

      if (!customSubject || !customContent) {
        return res.status(400).json({ message: 'Subject and content are required for bulk email.' });
      }

      // Send bulk email in batches
      await sendEmailsInBatches(emails.map(email => ({ email })), customSubject, customContent);

      return res.status(200).json({
        message: 'Bulk email sent successfully.',
        recipients: emails,
      });

    } catch (error) {
      console.error('Error sending bulk email:', error);
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
}

export default new BulkEmailController();