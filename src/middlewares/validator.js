import { body, validationResult } from 'express-validator';

export const validateCreateProduct = [
    body('nombre').notEmpty().withMessage('El nombre es requerido'),
    body('precio').isNumeric().withMessage('El precio debe ser un número'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

export const validateUpdateProduct = [
    body('nombre').optional().notEmpty().withMessage('El nombre no puede estar vacío'),
    body('precio').optional().isNumeric().withMessage('El precio debe ser un número'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];