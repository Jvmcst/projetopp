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
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Favorito {
    private int idFavorito;
    private int idUsuario;
    private int idPromocao;
}