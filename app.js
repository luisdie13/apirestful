import 'dotenv/config';
import express from 'express';
import productRoutes from './src/routes/entidad.route.js';

const app = express();

app.use(express.json());
app.use('/productos', productRoutes);

export default app;