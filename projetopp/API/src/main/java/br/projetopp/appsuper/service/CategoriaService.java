/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.projetopp.appsuper.service;

/**
 *
 * @author jv111
 */

import br.projetopp.appsuper.dao.CategoriaDao;
import br.projetopp.appsuper.model.Categoria;
import java.util.List;
import org.jdbi.v3.core.Jdbi;
import org.springframework.stereotype.Service;

@Service
public class CategoriaService {
    private final CategoriaDao categoriaDao;

    public CategoriaService(Jdbi jdbi) {
        this.categoriaDao = jdbi.onDemand(CategoriaDao.class);
    }

    public Categoria insert(Categoria categoria) {
        int idCategoria = categoriaDao.insert(categoria);
        categoria.setIdCategoria(idCategoria);
        return categoria;
    }

    public List<Categoria> getAll() {
        return categoriaDao.getAll();
    }

    public Categoria findById(int idCategoria) {
        return categoriaDao.findById(idCategoria);
    }

    public void update(Categoria categoria) {
        categoriaDao.update(categoria);
    }

    public void delete(int idCategoria) {
        categoriaDao.delete(idCategoria);
    }
}
