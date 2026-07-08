import mongoose from "mongoose";

const MONGO_URL = //Sua String com a senha do Banco de dados MongoDB (mongoose).

export async function mongo() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Banco conectado");
    }catch (error){
        console.log("Falha ao conectar-se ao Banco");
        return;
    };
};