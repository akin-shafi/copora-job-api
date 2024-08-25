import { Request, Response } from 'express';
import { EducationalDetailsService } from '../services/EducationalDetailsService';

export class EducationalDetailsController {
    private static educationalDetailsService = new EducationalDetailsService();

    // Create or update educational details based on applicationNo
    static async createEducationalDetails(req: Request, res: Response) {
        try {
            const { applicationNo } = req.body;

            // Check if the EducationalDetails with the given applicationNo exists
            const existingEducationalDetails = await EducationalDetailsController.educationalDetailsService.getEducationalDetailsByApplicationNo(applicationNo);

            if (existingEducationalDetails) {
                // If it exists, update the existing record
                const updatedEducationalDetails = await EducationalDetailsController.educationalDetailsService.updateEducationalDetailsByApplicationNo(applicationNo, req.body);
                return res.status(200).send({ message: 'Educational Details updated', data: updatedEducationalDetails });
            } else {
                // If it does not exist, create a new record
                const newEducationalDetails = await EducationalDetailsController.educationalDetailsService.createEducationalDetails(req.body);
                return res.status(201).send({ message: 'Educational Details created', data: newEducationalDetails });
            }
        } catch (error) {
            res.status(500).send({ message: 'Error creating or updating educational details', error: error.message });
        }
    }

    // Get Educational Details by applicationNo
    static async getEducationalDetailsByNo(req: Request, res: Response) {
        try {
            const { applicationNo } = req.params;
            const educationalDetails = await EducationalDetailsController.educationalDetailsService.getEducationalDetailsByApplicationNo(applicationNo);
            if (!educationalDetails) {
                return res.status(404).send({ message: 'Educational Details not found' });
            }
            res.status(200).send(educationalDetails);
        } catch (error) {
            res.status(500).send({ message: 'Error fetching educational details', error: error.message });
        }
    }

    // Update Educational Details by applicationNo
    static async updateEducationalDetailsByNo(req: Request, res: Response) {
        try {
            const { applicationNo } = req.params;
            const updatedEducationalDetails = await EducationalDetailsController.educationalDetailsService.updateEducationalDetailsByApplicationNo(applicationNo, req.body);
            if (!updatedEducationalDetails) {
                return res.status(404).send({ message: 'Educational Details not found' });
            }
            res.status(200).send(updatedEducationalDetails);
        } catch (error) {
            res.status(400).send({ message: 'Error updating educational details', error: error.message });
        }
    }

    // Delete Educational Details by applicationNo
    static async deleteEducationalDetailsByNo(req: Request, res: Response) {
        try {
            const { applicationNo } = req.params;
            const message = await EducationalDetailsController.educationalDetailsService.deleteEducationalDetailsByApplicationNo(applicationNo);
            res.status(200).send({ message });
        } catch (error) {
            res.status(404).send({ message: error.message });
        }
    }
}
