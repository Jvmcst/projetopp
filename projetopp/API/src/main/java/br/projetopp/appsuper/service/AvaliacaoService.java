/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.projetopp.appsuper.service;

// import br.projetopp.appsuper.dao.PromocaoDao;

/**
 *
 * @author jv111
 */

import br.projetopp.appsuper.dao.AvaliacaoDao;
import br.projetopp.appsuper.model.Avaliacao;

import java.util.List;

import org.jdbi.v3.core.Jdbi;
import org.springframework.stereotype.Service;

@Service
public class AvaliacaoService {

    private final AvaliacaoDao avaliacaoDao;

    public AvaliacaoService(Jdbi jdbi) {
        this.avaliacaoDao = jdbi.onDemand(AvaliacaoDao.class);

    }

    public void update(Avaliacao avaliacao) {
        avaliacaoDao.update(avaliacao);
    }

    public Avaliacao findById(int idAvaliacao) {
        return avaliacaoDao.findById(idAvaliacao);
    }

    public Avaliacao insert(Avaliacao avaliacao) {
        int idAvaliacao = avaliacaoDao.insert(avaliacao);
        avaliacao.setIdAvaliacao(idAvaliacao);
        return avaliacao;
    }

    public int getNumberTotalAvaliacoes(int idPromocao) {
        return avaliacaoDao.getNumberTotalAvaliacoes(idPromocao);
    }

    public int getAllNumberLikes(int idPromocao) {
        return avaliacaoDao.getAllNumberLikes(idPromocao);
    }

    public void delete(Avaliacao avaliacao) {
        avaliacaoDao.delete(avaliacao.getIdAvaliacao());
    }

    public Avaliacao findByIdUsuarioIdPromocao(int idUsuario, int idPromocao) {
        return avaliacaoDao.findByIdUsuarioIdPromocao(idUsuario, idPromocao);
    }

    public List<Avaliacao> findByIdPromocao(int idPromocao) {
        return avaliacaoDao.findByIdPromocao(idPromocao);
    }
}
