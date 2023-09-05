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

    public PromocaoService(Jdbi jdbi){
        this.promocaoDao = jdbi.onDemand(PromocaoDao.class);
    }

    public Promocao inserir (Promocao promocao){
        int idPromocao = promocaoDao.insert(promocao);
        promocao.setId(idPromocao);
        return promocao;
    }

    public List<Promocao> consultarTodos(){
        return promocaoDao.getAll();
    }

    public Promocao consultarPorId(int id){
        return promocaoDao.get(id);
    }

    public void alterar(Promocao promocao){
        promocaoDao.update(promocao);
    }

    public void excluir(int id){
        promocaoDao.delete(id);
    }
    
    public Promocao getPromocaos(Promocao promocao) {
//        List<Promocao> promocoes = PromocaoDao.getByPromocao(promocao.getId());

        return promocao;
    }
}
