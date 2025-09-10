import express from 'express';
import { getAll, getById, create, update, remove } from '../controllers/entidad.controller.js';
import { validateCreateProduct, validateUpdateProduct } from '../middlewares/validator.js';

const router = express.Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', validateCreateProduct, create);
router.put('/:id', validateUpdateProduct, update);
router.delete('/:id', remove);

export default router;