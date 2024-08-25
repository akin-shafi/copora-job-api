import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { GeneralInfo } from '../entities/GeneralInfoEntity';

export class GeneralInfoController {
    private generalInfoRepository = AppDataSource.getRepository(GeneralInfo);

    async create(req: Request, res: Response) {
        const generalInfo = this.generalInfoRepository.create(req.body);
        await this.generalInfoRepository.save(generalInfo);
        res.status(201).send(generalInfo);
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
