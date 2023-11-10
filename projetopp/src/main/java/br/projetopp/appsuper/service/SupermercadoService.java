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

    public SupermercadoService(Jdbi jdbi) {
        this.supermercadoDao = jdbi.onDemand(SupermercadoDao.class);
    }

    public Supermercado insert(Supermercado supermercado) {
        int idSupermercado = supermercadoDao.insert(supermercado);
        supermercado.setIdSupermercado(idSupermercado);
        return supermercado;
    }

    public List<Supermercado> getAll() {
        return supermercadoDao.getAll();
    }

    public Supermercado findById(int id) {
        return supermercadoDao.findById(id);
    }

    public void update(Supermercado supermercado) {
        supermercadoDao.update(supermercado);
    }

    public void delete(int id) {
        supermercadoDao.delete(id);
    }
}
