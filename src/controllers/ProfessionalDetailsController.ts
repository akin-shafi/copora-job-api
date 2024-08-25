import { Request, Response } from 'express';
import { ProfessionalDetailsService } from '../services/ProfessionalDetailsService';
import { UserService } from '../services/UserService';

export class ProfessionalDetailsController {
    // Create or update ProfessionalDetails
    static async createProfessionalDetails(req: Request, res: Response) {
        try {
            const { applicationNo } = req.body;

            const existingApplicant = await UserService.findApplicationNo(applicationNo);

            if(!existingApplicant){
                return res.status(400).json({ statusCode: 400, message: 'Applicant does not exist' });
            }

            // Check if the ProfessionalDetails with the given applicationNo exists
            const newEntry = await ProfessionalDetailsService.create(req.body);
            return res.status(201).send({ message: 'Professional details created', data: newEntry });

            // const existingEntry = await ProfessionalDetailsService.getByApplicationNo(applicationNo);

            // if (existingEntry) {
            //     // If it exists, update the existing record
            //     const updatedEntry = await ProfessionalDetailsService.updateByApplicationNo(applicationNo, req.body);
            //     return res.status(200).send({ message: 'Professional details updated', data: updatedEntry });
            // } else {
            //     // If it does not exist, create a new record
            //     const newEntry = await ProfessionalDetailsService.create(req.body);
            //     return res.status(201).send({ message: 'Professional details created', data: newEntry });
            // }
        } catch (error) {
            res.status(500).send({ message: 'Error creating or updating professional details', error: error.message });
        }
    }

    // Get ProfessionalDetails by applicationNo
    static async getProfessionalDetailsByNo(req: Request, res: Response) {
        try {
            const { applicationNo } = req.params;
            const entry = await ProfessionalDetailsService.getByApplicationNo(applicationNo);
            if (!entry) {
                return res.status(404).send({ message: 'Professional details not found' });
            }
            res.status(200).send(entry);
        } catch (error) {
            res.status(500).send({ message: 'Error fetching professional details', error: error.message });
        }
    }

    // Update ProfessionalDetails by applicationNo
    static async updateProfessionalDetailsByNo(req: Request, res: Response) {
        try {
            const { applicationNo } = req.params;
            const updatedEntry = await ProfessionalDetailsService.updateByApplicationNo(applicationNo, req.body);
            if (!updatedEntry) {
                return res.status(404).send({ message: 'Professional details not found' });
            }
            res.status(200).send(updatedEntry);
        } catch (error) {
            res.status(400).send({ message: 'Error updating professional details', error: error.message });
        }
    }

    // Delete ProfessionalDetails by applicationNo
    static async deleteProfessionalDetailsByNo(req: Request, res: Response) {
        try {
            const { applicationNo } = req.params;
            const message = await ProfessionalDetailsService.deleteByApplicationNo(applicationNo);
            res.status(200).send({ message });
        } catch (error) {
            res.status(404).send({ message: error.message });
        }
    }
}
