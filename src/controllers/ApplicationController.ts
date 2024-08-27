import { Request, Response } from 'express';
import { ApplicationService } from '../services/ApplicationService';

export class ApplicationController {
  static async createApplication(req: Request, res: Response) {
    try {
      const result = await ApplicationService.createApplication(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getApplicationByNo(req: Request, res: Response) {
    try {
      const result = await ApplicationService.getApplicationByNo(req.params.applicationNo);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async updateApplicationByNo(req: Request, res: Response) {
    try {
      const result = await ApplicationService.updateApplicationByNo(req.params.applicationNo, req.body);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteApplicationByNo(req: Request, res: Response) {
    try {
      await ApplicationService.deleteApplicationByNo(req.params.applicationNo);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getApplicantData(req: Request, res: Response) {
    try {
      const result = await ApplicationService.getApplicantData(req.params.applicationNo);
      if (!result.user) {
        return res.status(404).json({ message: 'Applicant not found' });
      }
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAllApplicants(req: Request, res: Response) {
    try {
      const result = await ApplicationService.getAllApplicants();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
