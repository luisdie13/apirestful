import request from 'supertest';
import app from '../app.js';
import pool from '../src/database/db.js';

describe('API de Productos', () => {
    let productId;

    beforeEach(async () => {
        await pool.query('DELETE FROM productos');
    });

    afterAll(async () => {
        await pool.end();
    });

    it('Debe crear un nuevo producto con datos válidos', async () => {
        const newProduct = { nombre: 'Teclado Mecánico', precio: 85.50 };
        const res = await request(app).post('/productos').send(newProduct);

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.nombre).toBe(newProduct.nombre);
        productId = res.body.id;
    });

    it('Debe rechazar la creación de un producto sin nombre', async () => {
        const res = await request(app).post('/productos').send({ precio: 50.00 });
        expect(res.statusCode).toBe(400);
        expect(res.body.errors[0].msg).toBe('El nombre es requerido');
    });

    it('Debe obtener un producto por su ID', async () => {
        const newProduct = await request(app).post('/productos').send({ nombre: 'Ratón Inalámbrico', precio: 30.00 });
        const res = await request(app).get(`/productos/${newProduct.body.id}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.nombre).toBe('Ratón Inalámbrico');
    });

    it('Debe devolver 404 para un producto que no existe', async () => {
        const nonExistentId = 9999;
        const res = await request(app).get(`/productos/${nonExistentId}`);
        expect(res.statusCode).toBe(404);
        expect(res.body.message).toBe('Producto no encontrado');
    });

    it('Debe actualizar un producto existente', async () => {
        const createdProduct = await request(app).post('/productos').send({ nombre: 'Monitor 4K', precio: 450.00 });
        const updatedInfo = { nombre: 'Monitor 4K PRO' };
        const res = await request(app).put(`/productos/${createdProduct.body.id}`).send(updatedInfo);

        expect(res.statusCode).toBe(200);
        expect(res.body.nombre).toBe('Monitor 4K PRO');
    });
});