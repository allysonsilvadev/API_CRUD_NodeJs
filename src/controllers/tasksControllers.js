import { Task } from "../model/task.js";

//Lista de tarefas controllers

export const criarTask = async (req, res) => {
    const { title, description, done, user } = req.body

    try {
        if (!title || !user) {
            res.status(400).json({ message: "Todas as informações são obrigatórias para criar uma tarefa" });
            return
        };

        const newTask = await Task.create({
            title: title,
            description: description,
            done: done,
            user: user
        });

        res.json(newTask);


    } catch (error) {
        res.status(500).json({ message: "Erro ao criar a tarefa" });
    }
}


export const listarTasks = async (req, res) => {
    try {
        const mostrarTasks = await Task.find().populate('user');
        res.json(mostrarTasks);
    } catch (error) {
        console.log("Erro ao listar as tarefas", error.message);
        res.status(500).json({ message: "Erro ao listar tarefas" });
        return;
    };
};

export const pedirTaskId = async (req, res) => {
    try {
        const pedirTaskUser = await Task.find({user: req.params.id});

        res.json(pedirTaskUser);

    }catch(error) {
        res.json({message: "Erro ao listar tarefas desse usuário"});
        return;
    };
};

export const deletarTask = async (req, res) => {
    try {
        const excluirTask = await Task.findByIdAndDelete(req.params.id);
        res.json({ message: "Tarefa excluida com sucesso" });
    } catch (error) {
        res.json({ message: "Erro ao excluir tarefa" });
        return;
    };
};

export const atualizarTask = async (req, res) => {
    const { title, description, done, user } = req.body;

    try {
        const editerTask = await Task.findByIdAndUpdate(req.params.id, {
            title: title,
            description: description,
            done: done,
            user: user
        });
        res.json({ message: "Tarefa atualizada com sucesso" });

    } catch (error) {
        res.json({ message: "Erro ao editar tarefa" });
        return;
    };
};