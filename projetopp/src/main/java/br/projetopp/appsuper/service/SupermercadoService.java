/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.projetopp.appsuper.service;

/**
 *
 * @author jv111
 */

import br.projetopp.appsuper.dao.SupermercadoDao;
import br.projetopp.appsuper.model.Supermercado;
import java.util.List;
import org.jdbi.v3.core.Jdbi;
import org.springframework.stereotype.Service;

@Service
public class SupermercadoService {

    private final SupermercadoDao supermercadoDao;

    public SupermercadoService(Jdbi jdbi){
        this.supermercadoDao = jdbi.onDemand(SupermercadoDao.class);
    }

    public Supermercado inserir (Supermercado supermercado){
        int idSupermercado = supermercadoDao.insert(supermercado);
        supermercado.setId(idSupermercado);
        return supermercado;
    }

    public List<Supermercado> consultarTodos(){
        return supermercadoDao.getAll();
    }

    public Supermercado consultarPorId(int id){
        return supermercadoDao.get(id);
    }

    public void alterar(Supermercado supermercado){
        supermercadoDao.update(supermercado);
    }

    public void excluir(int id){
        supermercadoDao.delete(id);
    }
}
