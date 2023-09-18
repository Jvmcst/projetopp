/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.projetopp.appsuper.service;

import br.projetopp.appsuper.dao.PromocaoDao;

/**
 *
 * @author jv111
 */

import br.projetopp.appsuper.dao.UsuarioDao;
import br.projetopp.appsuper.model.Promocao;
import br.projetopp.appsuper.model.Usuario;
import java.util.List;
import org.jdbi.v3.core.Jdbi;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    private final UsuarioDao usuarioDao;
    private final PromocaoDao promocaoDao;

    public UsuarioService(Jdbi jdbi) {
        this.usuarioDao = jdbi.onDemand(UsuarioDao.class);
        this.promocaoDao = jdbi.onDemand(PromocaoDao.class);
    }

    public Usuario inserir(Usuario usuario) {
        int idUsuario = usuarioDao.insert(usuario);
        usuario.setIdUsuario(idUsuario);
        return usuario;
    }

    public List<Usuario> consultarTodos() {
        List<Usuario> usuarios = usuarioDao.getAll();

        for (Usuario usuario : usuarios) {
            usuario = getPromocaos(usuario);
        }

        return usuarios;
    }

    public Usuario consultarPorId(int id) {
        Usuario usuario = usuarioDao.get(id);
        usuario = getPromocaos(usuario);
        return usuario;
    }

    public void alterar(Usuario usuario) {
        usuarioDao.update(usuario);
    }

    public void excluir(int id) {
        usuarioDao.delete(id);
    }

    public Usuario getPromocaos(Usuario usuario) {
        List<Promocao> promocaos = promocaoDao.getAllByUsuario(usuario);
        usuario.setPromocaos(promocaos);

        return usuario;
    }

}
