export class Promocao {
  idPromocao: number;
  idUsuario: number;
  idCategoria: number;
  idSupermercado: number;
  nome: string;
  valor: number;
  dataInicio: string;
  dataTermino: string;
  relevancia: number;
  status: string;
  descricao: string;
  foto: string;

  constructor() {
    this.idPromocao = 0;
    this.idUsuario = 0;
    this.idCategoria = 0;
    this.idSupermercado = 0;
    this.nome = "";
    this.valor = 0;
    this.dataInicio = "";
    this.dataTermino = "";
    this.relevancia = 0;
    this.status = "";
    this.descricao = "";
    this.foto = "";
  }
}
