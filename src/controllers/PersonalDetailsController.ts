import { Request, Response } from 'express';
import { PersonalDetailsService } from '../services/PersonalDetailsService';
import { UserService } from '../services/UserService';

// APP-C57FF572
export class PersonalDetailsController {
    // Create or update PersonalDetails
    static async createPersonalDetails(req: Request, res: Response) {
        try {
            const { applicationNo } = req.body;

            const existingApplicant = await UserService.findApplicationNo(applicationNo);

            if(!existingApplicant){
                return res.status(400).json({ statusCode: 400, message: 'Applicant does not exist' });
            }

            // Check if the PersonalDetails with the given applicationNo exists
            const existingEntry = await PersonalDetailsService.getByApplicationNo(applicationNo);

            if (existingEntry) {
                // If it exists, update the existing record
                const updatedEntry = await PersonalDetailsService.updateByApplicationNo(applicationNo, req.body);
                return res.status(200).send({ message: 'Personal details updated', data: updatedEntry });
            } else {
                // If it does not exist, create a new record
                const newEntry = await PersonalDetailsService.create(req.body);
                return res.status(201).send({ message: 'Personal details created', data: newEntry });
            }
        } catch (error) {
            res.status(500).send({ message: 'Error creating or updating personal details', error: error.message });
        }
    }

    // Get PersonalDetails by applicationNo
    static async getPersonalDetailsByNo(req: Request, res: Response) {
        try {
            const { applicationNo } = req.params;
            const entry = await PersonalDetailsService.getByApplicationNo(applicationNo);
            if (!entry) {
                return res.status(404).send({ message: 'Personal details not found' });
            }
            res.status(200).send(entry);
        } catch (error) {
            res.status(500).send({ message: 'Error fetching personal details', error: error.message });
        }
    }

    // Update PersonalDetails by applicationNo
    static async updatePersonalDetailsByNo(req: Request, res: Response) {
        try {
            const { applicationNo } = req.params;
            const updatedEntry = await PersonalDetailsService.updateByApplicationNo(applicationNo, req.body);
            if (!updatedEntry) {
                return res.status(404).send({ message: 'Personal details not found' });
            }
            res.status(200).send(updatedEntry);
        } catch (error) {
            res.status(400).send({ message: 'Error updating personal details', error: error.message });
        }
    }

    // Delete PersonalDetails by applicationNo
    static async deletePersonalDetailsByNo(req: Request, res: Response) {
        try {
            const { applicationNo } = req.params;
            const message = await PersonalDetailsService.deleteByApplicationNo(applicationNo);
            res.status(200).send({ message });
        } catch (error) {
            res.status(404).send({ message: error.message });
        }
    }
}
