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
    private final EmailService emailService;
    private final PromocaoDao promocaoDao;

    public UsuarioService(Jdbi jdbi, EmailService emailService) {
        this.usuarioDao = jdbi.onDemand(UsuarioDao.class);
        this.promocaoDao = jdbi.onDemand(PromocaoDao.class);
        this.emailService = emailService;
    }

    public Usuario insert(Usuario usuario) {
        int idUsuario = usuarioDao.insert(usuario);
        usuario.setIdUsuario(idUsuario);
        return usuario;
    }

    public List<Usuario> getAll() {
        List<Usuario> usuarios = usuarioDao.getAll();

        for (Usuario usuario : usuarios) {
            usuario = getPromocaos(usuario);
        }

        return usuarios;
    }

    public Usuario findById(int idUsuario) {
        Usuario usuario = usuarioDao.findById(idUsuario);
        usuario = getPromocaos(usuario);
        return usuario;
    }

    public void update(Usuario usuario) {
        usuarioDao.update(usuario);
    }

    public void delete(int idUsuario) {
        usuarioDao.delete(idUsuario);
    }

    public void recoverSenha(int idUsuario){
        Usuario usuario = usuarioDao.findById(idUsuario);

        String text = "Olá " + usuario.getNome() + ". Sua senha é " + usuario.getSenha();

        emailService.sendSimpleMessage(usuario.getEmail(), "Recuperação de Senha", text);
    }

    public Usuario getUserByEmail(String email) {
        return usuarioDao.getUserByEmail(email);
    }

    public Usuario getDevByEmail(String email) {
        return usuarioDao.getDevByEmail(email);
    }

    public Usuario getPromocaos(Usuario usuario) {
        List<Promocao> promocaos = promocaoDao.getAllByUsuario(usuario);
        usuario.setPromocaos(promocaos);

        return usuario;
    }
}
