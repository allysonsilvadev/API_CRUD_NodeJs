import { User } from "../model/User.js";

//Lista de usuários Controllers

export const rotaInicial = (req,res) => {
    res.json({message: "Rota inicial"});
};

export const mostrarUsers = async (req, res) => {
    const pegarUsuarios = await User.find();
    res.json(pegarUsuarios);
};

export const cadastrarUser = async (req,res) => {
    const { name , email, cidade, password } = req.body;

    try {
        if (!name || !email || !cidade || !password){
            res.status(400).json({message: "Todas as informações são obrigatórias"});
            return;
        };

        const newUser = await User.create({
            name: name,
            email: email,
            cidade: cidade,
            password: password

        });

        res.json(newUser);

    }catch (error) {
        console.log("Erro ao criar usuário");
        return;
    };
};

export const deletarUser = async (req, res) => {
    try {
        const excluirUser = await User.findByIdAndDelete(req.params.id);
        res.json({message: "Uusário excluido com sucesso"});

    }catch (error){
        console.log(error(401)).json({message: "Erro ao excluir o usuário"});
        return;
    };
};

export const atualizarUser = async (req, res) => {
    const {name, email, cidade, password} = req.body;

    const editarUser = await User.findByIdAndUpdate(req.params.id, {
        name: name,
        email: email, 
        cidade: cidade,
    });
    res.json({message: "Usuário alterado com sucesso"});
};