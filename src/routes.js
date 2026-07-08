import { Router } from 'express';

import { rotaInicial } from './controllers/usersControllers.js';

// CRUD usuários
import { mostrarUsers, cadastrarUser, deletarUser, atualizarUser } from './controllers/usersControllers.js';

//CRUD lista de tarefas
import { criarTask, listarTasks, deletarTask, atualizarTask, pedirTaskId } from './controllers/tasksControllers.js';

export const routes = Router();


routes.get('/', rotaInicial);
routes.get('/usuarios', mostrarUsers);
routes.post('/usuarios', cadastrarUser);
routes.delete('/usuarios/:id', deletarUser);
routes.put('/usuarios/:id', atualizarUser);


//Rotas da lista de tarefas 
routes.post('/task', criarTask);
routes.get('/task', listarTasks);
routes.get('/task/:id', pedirTaskId);
routes.delete('/task/:id', deletarTask);
routes.put('/task/:id', atualizarTask);
