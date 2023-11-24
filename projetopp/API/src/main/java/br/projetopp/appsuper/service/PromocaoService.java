/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.projetopp.appsuper.service;

/**
 *
 * @author jv111
 */

import br.projetopp.appsuper.model.Promocao;
import java.util.List;
import org.jdbi.v3.core.Jdbi;
import org.springframework.stereotype.Service;
import br.projetopp.appsuper.dao.PromocaoDao;

@Service
public class PromocaoService {
    private final PromocaoDao promocaoDao;

    public PromocaoService(Jdbi jdbi) {
        this.promocaoDao = jdbi.onDemand(PromocaoDao.class);
    }

    public Promocao insert(Promocao promocao) {
        int idPromocao = promocaoDao.insert(promocao);
        promocao.setIdPromocao(idPromocao);
        return promocao;
    }

    public void updateRelevancia(int idPromocao) {
        promocaoDao.updateRelevancia(idPromocao);
    }

    public List<Promocao> getAll() {
        return promocaoDao.getAll();
    }

    public Promocao findById(int id) {
        return promocaoDao.findById(id);
    }

    public void update(Promocao promocao) {
        promocaoDao.update(promocao);
    }

    public void delete(int id) {
        promocaoDao.delete(id);
    }

    public List<Promocao> getAllByUsuario(int idUsuario) {
        return promocaoDao.getAllByUsuario(idUsuario);
    }

    public List<Promocao> find(int idCategoria, int idSupermercado, String searchField) {
        return promocaoDao.find(idCategoria, idSupermercado, searchField);
    }

    public List<Promocao> findToday() {
        String date = new java.sql.Date(new java.util.Date().getTime()).toString();
        return promocaoDao.findToday(date);
    }

    // public void fotoUpdate(int id, String foto){
    //     System.err.println(id);
    //     System.err.println(foto);
    //     promocaoDao.updateFoto(id, foto);
    // }
}
