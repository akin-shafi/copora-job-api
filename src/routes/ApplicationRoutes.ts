import { Router } from 'express';
import { ApplicationController } from '../controllers/ApplicationController';

const router = Router();

router.post('/', ApplicationController.createApplication);
router.get('/:applicationNo', ApplicationController.getApplicationByNo);
router.put('/:applicationNo', ApplicationController.updateApplicationByNo);
router.delete('/:applicationNo', ApplicationController.deleteApplicationByNo);

export default router;
