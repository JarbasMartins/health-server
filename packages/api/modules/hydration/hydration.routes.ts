import { Router } from 'express';
import { controller } from './index';
const router = Router();

router.post('/', controller.handleSave);
router.get('/:userId/:date', controller.handleGetDaily);

export { router };
