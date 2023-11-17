package br.projetopp.appsuper.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString

public class Promocao {
    private int idPromocao;
    private int idUsuario;
    private int idCategoria;
    private int idSupermercado;
    private String nome;
    private double valor;
    private String dataInicio;
    private String dataTermino;
    private String relevancia;
    private String status;
    private String descricao;
    private String foto;
}
