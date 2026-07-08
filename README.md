# API CRUD - Node.js + MongoDB

API REST simples para gerenciamento de **Usuários** e **Tarefas** (Tasks), com relacionamento entre as duas coleções.

## Tecnologias utilizadas

| Tecnologia | Função |
|---|---|
| Node.js | Ambiente de execução JavaScript |
| Express | Framework para criação das rotas/servidor |
| MongoDB | Banco de dados NoSQL |
| Mongoose | ODM para modelar e consultar o MongoDB |

## Programas usados para desenvolver e testar

| Programa | Uso |
|---|---|
| VS Code | Editor de código |
| MongoDB Compass | Visualizar e conferir os dados salvos no banco |
| Postman | Testar as requisições HTTP da API |
| Node (`--watch`) | Rodar o servidor com reinício automático a cada alteração |

## Como rodar o projeto

```bash
# instalar dependências
npm install

# subir o servidor
node --watch index.js
```

O servidor sobe em `http://localhost:3000`.

## Estrutura de dados

### User

| Campo | Tipo | Obrigatório |
|---|---|---|
| name | String | Sim |
| email | String | Sim |
| cidade | String | Sim |
| password | String | Sim |

### Task

| Campo | Tipo | Obrigatório |
|---|---|---|
| title | String | Sim |
| description | String | Não |
| done | Boolean (padrão `false`) | Não |
| user | ObjectId (referência ao User) | Sim |
| createdAt / updatedAt | Date (gerado automaticamente) | - |

## Rotas da API

### Usuários

| Método | Rota | Descrição |
|---|---|---|
| POST | `/usuarios` | Cria um novo usuário |
| GET | `/usuarios` | Lista todos os usuários |
| PUT | `/usuarios/:id` | Atualiza um usuário existente |
| DELETE | `/usuarios/:id` | Exclui um usuário |

### Tarefas

| Método | Rota | Descrição |
|---|---|---|
| POST | `/task` | Cria uma nova tarefa |
| GET | `/tasks` | Lista todas as tarefas (com dados do usuário via populate) |
| GET | `/usuarios/:id/tasks` | Lista as tarefas de um usuário específico |
| PUT | `/task/:id` | Atualiza uma tarefa existente |
| DELETE | `/task/:id` | Exclui uma tarefa |

## Guia de teste no Postman

### 1. Criar um usuário
- Método: `POST`
- URL: `http://localhost:3000/usuarios`
- Body → `raw` → `JSON`:
```json
{
    "name": "Allyson",
    "email": "allyson@teste.com",
    "cidade": "São Paulo",
    "password": "123456"
}
```
- Copie o `_id` retornado na resposta — ele será usado para criar tarefas.

### 2. Criar uma tarefa
- Método: `POST`
- URL: `http://localhost:3000/task`
- Body → `raw` → `JSON`:
```json
{
    "title": "Academia",
    "description": "Ir treinar depois do trabalho",
    "done": false,
    "user": "COLE_AQUI_O_ID_DO_USUARIO"
}
```

### 3. Listar todas as tarefas
- Método: `GET`
- URL: `http://localhost:3000/tasks`
- Retorna todas as tarefas, já com os dados do usuário dono de cada uma.

### 4. Listar tarefas de um usuário específico
- Método: `GET`
- URL: `http://localhost:3000/usuarios/COLE_AQUI_O_ID_DO_USUARIO/tasks`

### 5. Atualizar uma tarefa
- Método: `PUT`
- URL: `http://localhost:3000/task/COLE_AQUI_O_ID_DA_TASK`
- Body → `raw` → `JSON`:
```json
{
    "title": "Academia",
    "description": "Treino de pernas",
    "done": true,
    "user": "COLE_AQUI_O_ID_DO_USUARIO"
}
```

### 6. Excluir uma tarefa
- Método: `DELETE`
- URL: `http://localhost:3000/task/COLE_AQUI_O_ID_DA_TASK`

### 7. Excluir um usuário
- Método: `DELETE`
- URL: `http://localhost:3000/usuarios/COLE_AQUI_O_ID_DO_USUARIO`

## Códigos de status usados

| Status | Significado |
|---|---|
| 200 | Requisição bem-sucedida |
| 400 | Dados obrigatórios não enviados |
| 404 | Registro não encontrado (id inválido ou inexistente) |
| 500 | Erro inesperado no servidor |

## Próximos passos

- [ ] Implementar autenticação com **JWT** (JSON Web Token)
- [ ] Hash de senha com `bcrypt`
- [ ] Rota de login (`POST /login`)
- [ ] Middleware de autenticação para proteger as rotas
- [ ] Vincular a criação de tarefas ao usuário autenticado (via token), em vez de receber o `user` no body
