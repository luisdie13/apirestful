import pool from '../database/db.js';

export const getAllProducts = async () => {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM productos');
        return result.rows;
    } finally {
        client.release();
    }
};

export const getProductById = async (id) => {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM productos WHERE id = $1', [id]);
        return result.rows[0];
    } finally {
        client.release();
    }
};

export const createProduct = async ({ nombre, precio }) => {
    const client = await pool.connect();
    try {
        const result = await client.query(
            'INSERT INTO productos (nombre, precio) VALUES ($1, $2) RETURNING *',
            [nombre, precio]
        );
        return result.rows[0];
    } finally {
        client.release();
    }
};

export const updateProduct = async (id, productData) => {
    const fields = Object.keys(productData);
    const values = Object.values(productData);
    const setClause = fields.map((field, index) => `${field} = $${index + 1}`).join(', ');

    values.push(id); 

    const client = await pool.connect();
    try {
        const query = `UPDATE productos SET ${setClause} WHERE id = $${fields.length + 1} RETURNING *`;
        const result = await client.query(query, values);
        return result.rows[0];
    } finally {
        client.release();
    }
};

export const deleteProduct = async (id) => {
    const client = await pool.connect();
    try {
        const result = await client.query('DELETE FROM productos WHERE id = $1 RETURNING *', [id]);
        return result.rowCount;
    } finally {
        client.release();
    }
};