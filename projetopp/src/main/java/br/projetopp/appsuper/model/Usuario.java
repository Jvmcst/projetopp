/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.projetopp.appsuper.model;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 *
 * @author jv111
 */

// anotation (anotações)
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString

public class Usuario {
    private int idUsuario;
    private String nome;
    private String email;
    private String senha;
    private String telefone;
    private String foto;
    private List<Promocao> promocaos;
}
