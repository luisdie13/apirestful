import * as productService from '../services/entidad.service.js';

export const getAll = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los productos', error: error.message });
    }
};

export const getById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await productService.getProductById(id);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el producto', error: error.message });
    }
};

export const create = async (req, res) => {
    const { nombre, precio } = req.body;
    try {
        const newProduct = await productService.createProduct({ nombre, precio });
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el producto', error: error.message });
    }
};

export const update = async (req, res) => {
    const { id } = req.params;
    const { nombre, precio } = req.body;
    try {
        const updatedProduct = await productService.updateProduct(id, { nombre, precio });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado para actualizar' });
        }
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
    }
};

export const remove = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCount = await productService.deleteProduct(id);
        if (deletedCount === 0) {
            return res.status(404).json({ message: 'Producto no encontrado para eliminar' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto', error: error.message });
    }
};