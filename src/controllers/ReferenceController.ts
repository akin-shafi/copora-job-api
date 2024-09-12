import { Request, Response } from 'express';
import { ReferenceService } from '../services/ReferenceService';
import { UserService } from '../services/UserService';

export class ReferenceController {
    // Create or update Reference
    static async createOrUpdateReference(req: Request, res: Response) {
        // const { applicationNo } = req.params;
        try {
            const { applicationNo, ...referenceDetails } = req.body;
    
            // Validate applicationNo
            if (!applicationNo) {
                return res.status(400).json({ statusCode: 400, message: 'Application number is required' });
            }
    
            const existingApplicant = await UserService.findApplicationNo(applicationNo);
    
            if (!existingApplicant) {
                return res.status(400).json({ statusCode: 400, message: 'Applicant does not exist' });
            }
    
            // Ensure referenceDetails is in the correct format
            if (typeof referenceDetails !== 'object' || Array.isArray(referenceDetails)) {
                return res.status(400).json({ statusCode: 400, message: 'Invalid reference details format' });
            }
    
            // Process and save each entry in the referenceDetails
            const entries = Object.values(referenceDetails).filter(value => typeof value === 'object' && value !== null) as Record<string, any>[];
            if (entries.length === 0) {
                return res.status(400).json({ statusCode: 400, message: 'No valid reference details provided' });
            }
    
            const updatedEntries = [];
            const newEntries = [];

            for (const entry of entries) {
                if (entry && typeof entry === 'object') {
                    const { phone, ...restOfEntry } = entry;
    
                    if (!phone) {
                        return res.status(400).json({ statusCode: 400, message: 'Reference contact phone is required' });
                    }
    
                    const existingEntry = await ReferenceService.findByPhone(phone);
    
                    if (existingEntry) {
                        // Update existing entry
                        await ReferenceService.update(existingEntry.id, {
                            ...restOfEntry,
                            applicationNo
                        });
                        updatedEntries.push({ ...existingEntry, ...restOfEntry });
                    } else {
                        // Create new entry
                        const newEntry = await ReferenceService.create({
                            applicationNo,
                            ...entry
                        });
                        newEntries.push(newEntry);
                    }
                }
            }
    
            return res.status(201).json({
                message: 'reference details processed',
                data: { updatedEntries, newEntries }
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
