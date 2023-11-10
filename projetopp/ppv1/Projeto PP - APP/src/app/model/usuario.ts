export class Usuario {
    idUsuario: number;
    email: string;
    nome: string;
    senha: string;
    telefone: string;
    foto: string;

    constructor() {
        this.idUsuario = 0;
        this.email = "";
        this.nome = "";
        this.senha = "";
        this.telefone = "";
        this.foto = "";
    }
}
