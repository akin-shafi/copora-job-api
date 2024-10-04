import { Request, Response } from 'express';
import { generatePDF } from '../utils/pdfGenerator';
import { sendAgreementEmail } from '../lib/emailActions';
import { agreementTemplate } from '../doc-templates/agreementTemplate';
import { UserService } from '../services/UserService';
import { ContactDetailsService } from '../services/ContactDetailsService';

import fs from 'fs';
import path from 'path';

export const createAgreement = async (req: Request, res: Response) => {
    try {
      const { applicationNo, jobTitle } = req.body;
      

      const existingApplicant = await UserService.findApplicationNo(applicationNo);
      const applicantContact = await ContactDetailsService.getContactDetailsByApplicationNo(applicationNo)
    
      if (!existingApplicant) {
            return res.status(400).json({ statusCode: 400, message: 'Applicant does not exist' });
      }

      const { firstName, lastName, middleName, email, } = existingApplicant;
      const { street, country, postcode} = applicantContact;
  
      // Generate agreement HTML content with dynamic data
      const agreementHtml = agreementTemplate({
        firstName,
        lastName,
        middleName,
        email,
        address: street + " " + country + " " + postcode,
        jobTitle,
      });
  
      // Generate PDF
      const pdfPath = path.join(__dirname, '../../agreements', `${firstName}_${lastName}_agreement.pdf`);
      await generatePDF(agreementHtml, pdfPath);
  
      // Send PDF via email
      await sendAgreementEmail({ firstName, email }, pdfPath);
  
      res.status(200).json({ message: 'Agreement generated and sent successfully.' });
    } catch (error) {
      console.error('Error generating agreement:', error);
      res.status(500).json({ error: 'Failed to generate agreement' });
    }
  };
