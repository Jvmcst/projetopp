/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.projetopp.appsuper.service;

/**
 *
 * @author jv111
 */

import br.projetopp.appsuper.dao.FavoritoDao;
import br.projetopp.appsuper.dao.PromocaoDao;
import br.projetopp.appsuper.model.Favorito;
import br.projetopp.appsuper.model.Promocao;

import java.util.List;

import org.jdbi.v3.core.Jdbi;
import org.springframework.stereotype.Service;

@Service
public class FavoritoService {
    private final FavoritoDao favoritoDao;
    private final PromocaoDao promocaoDao;

    public FavoritoService(Jdbi jdbi) {
        this.favoritoDao = jdbi.onDemand(FavoritoDao.class);
        this.promocaoDao = jdbi.onDemand(PromocaoDao.class);
    }

    public Favorito insert(Favorito Favorito) {
        int idFavorito = favoritoDao.insert(Favorito);
        Favorito.setIdFavorito(idFavorito);
        return Favorito;
    }

    public Favorito findById(int idUsuario, int idPromocao) {
        return favoritoDao.findByIdUsuarioIdPromocao(idUsuario, idPromocao);
    }

    public void update(Favorito Favorito) {
        favoritoDao.update(Favorito);
    }

    public void delete(int idFavorito) {
        favoritoDao.delete(idFavorito);
    }

    public Favorito findByIdUsuarioIdPromocao(int idUsuario, int idPromocao) {
        return favoritoDao.findByIdUsuarioIdPromocao(idUsuario, idPromocao);
    }

    public List<Promocao> getAllSavedByUsuario(int idUsuario) {
        return promocaoDao.getAllSavedByUsuario(idUsuario);
    }
}
