/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.projetopp.appsuper.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 *
 * @author jv111
 */

//anotation (anotações)
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString

public class Promocao {
    private int idPromocao;
    private int idUsuario;
    private int idCategoria;
    private int idSupermecado;
    private String nome;
    private double valor;
    private String dataPromocao;
    private String relevancia;
    private String statusPromocao;
    private String descricao;
    private String foto;

    public void setId(int idPromocao) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }
}
