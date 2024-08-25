import { Request, Response } from 'express';
import { ReferenceService } from '../services/ReferenceService';
import { UserService } from '../services/UserService';

export class ReferenceController {
    // Create or update Reference
    static async createOrUpdateReference(req: Request, res: Response) {
        const { applicationNo } = req.params;

        try {
            const existingApplicant = await UserService.findApplicationNo(applicationNo);

            if(!existingApplicant){
                return res.status(400).json({ statusCode: 400, message: 'Applicant does not exist' });
            }
            const reference = await ReferenceService.createOrUpdate(req.body);
            res.status(201).send(reference);
        } catch (error) {
            res.status(400).send({ message: 'Error creating or updating reference', error: error.message });
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
