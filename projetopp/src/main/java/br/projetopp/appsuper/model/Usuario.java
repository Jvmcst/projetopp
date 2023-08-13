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

public class Usuario {
    private int idUsuario;
    private String nomeUsuario;
    private String email;
    private String senha;
    private String telefone;
    private String confiabilidadeUsuario;

    public void setId(int idAluno) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }
}
