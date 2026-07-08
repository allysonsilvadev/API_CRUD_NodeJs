import express, { Router } from 'express';
import { mongo } from './src/db.js';
import { routes } from './src/routes.js';

const app = express();
app.use(express.json());
app.use(routes);
mongo();

const PORT = 3000;
app.listen(PORT, () => {
    console.log("Servidor conectado");
});