import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { GeneralInfo } from '../entities/GeneralInfoEntity';
import { GeneralInfoService } from '../services/GeneralInfoService';

import { UserService } from '../services/UserService';

export class GeneralInfoController {
    private generalInfoRepository = AppDataSource.getRepository(GeneralInfo);

    async create(req: Request, res: Response) {
        const { applicationNo } = req.body;

        const existingApplicant = await UserService.findApplicationNo(applicationNo);

        if (!existingApplicant) {
            res.status(400).json({ statusCode: 400, message: 'Applicant does not exist' });
            return; // Ensure to return here to avoid further execution
        }

        const existingEntry = await GeneralInfoService.getByApplicationNo(applicationNo);

        if (existingEntry) {
            const updatedEntry = await GeneralInfoService.updateByApplicationNo(applicationNo, req.body);
            res.status(200).json({ message: 'General Info updated', data: updatedEntry });
          } else {
            const generalInfo = this.generalInfoRepository.create(req.body);
            res.status(201).json({ message: 'General Info created', data: generalInfo });
          }

    }

    async getAll(req: Request, res: Response) {
        const generalInfo = await this.generalInfoRepository.find();
        res.status(200).send(generalInfo);
    }

    async getById(req: Request, res: Response) {
        const generalInfo = await this.generalInfoRepository.findOneBy({ id: parseInt(req.params.id) });
        if (!generalInfo) {
            return res.status(404).send('General Info not found');
        }
        res.status(200).send(generalInfo);
    }

    async update(req: Request, res: Response) {
        const generalInfo = await this.generalInfoRepository.findOneBy({ id: parseInt(req.params.id) });
        if (!generalInfo) {
            return res.status(404).send('General Info not found');
        }
        Object.assign(generalInfo, req.body);
        await this.generalInfoRepository.save(generalInfo);
        res.status(200).send(generalInfo);
    }

    async delete(req: Request, res: Response) {
        const result = await this.generalInfoRepository.delete({ id: parseInt(req.params.id) });
        if (result.affected === 0) {
            return res.status(404).send('General Info not found');
        }
        res.status(200).send('General Info deleted');
    }

    
}
