import { Request, Response } from 'express';
import { AgreementConsentService } from '../services/AgreementConsentService';

export class AgreementConsentController {
    // Create or update an AgreementConsent
    static async create(req: Request, res: Response) {
        try {
            const { applicationNo } = req.body;

            // Check if the AgreementConsent with the given applicationNo exists
            const existingAgreementConsent = await AgreementConsentService.getByApplicationNo(applicationNo);

            if (existingAgreementConsent) {
                // If it exists, update the existing record
                const updatedAgreementConsent = await AgreementConsentService.updateByApplicationNo(applicationNo, req.body);
                return res.status(200).send({ message: 'Agreement Consent updated', data: updatedAgreementConsent });
            } else {
                // If it does not exist, create a new record
                const newAgreementConsent = await AgreementConsentService.create(req.body);
                return res.status(201).send({ message: 'Agreement Consent created', data: newAgreementConsent });
            }
        } catch (error) {
            res.status(500).send({ message: 'Error creating or updating Agreement Consent', error: error.message });
        }
    }

    // Get AgreementConsent by applicationNo
    static async getAgreementConsentByNo(req: Request, res: Response) {
        try {
            const { applicationNo } = req.params;
            const agreementConsent = await AgreementConsentService.getByApplicationNo(applicationNo);
            if (!agreementConsent) {
                return res.status(404).send({ message: 'Agreement Consent not found' });
            }
            res.status(200).send(agreementConsent);
        } catch (error) {
            res.status(500).send({ message: 'Error fetching Agreement Consent', error: error.message });
        }
    }

    // Update AgreementConsent by applicationNo
    static async updateAgreementConsentByNo(req: Request, res: Response) {
        try {
            const { applicationNo } = req.params;
            const updatedAgreementConsent = await AgreementConsentService.updateByApplicationNo(applicationNo, req.body);
            if (!updatedAgreementConsent) {
                return res.status(404).send({ message: 'Agreement Consent not found' });
            }
            res.status(200).send(updatedAgreementConsent);
        } catch (error) {
            res.status(400).send({ message: 'Error updating Agreement Consent', error: error.message });
        }
    }

    // Delete AgreementConsent by applicationNo
    static async deleteAgreementConsentByNo(req: Request, res: Response) {
        try {
            const { applicationNo } = req.params;
            const message = await AgreementConsentService.deleteByApplicationNo(applicationNo);
            res.status(200).send({ message });
        } catch (error) {
            res.status(404).send({ message: error.message });
        }
    }
}
