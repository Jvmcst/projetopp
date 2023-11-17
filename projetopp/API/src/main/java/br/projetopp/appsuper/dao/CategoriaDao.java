/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.projetopp.appsuper.dao;

import br.projetopp.appsuper.model.Categoria;
import java.util.List;
import org.jdbi.v3.sqlobject.config.RegisterBeanMapper;
import org.jdbi.v3.sqlobject.customizer.BindBean;
import org.jdbi.v3.sqlobject.customizer.Bind;
import org.jdbi.v3.sqlobject.statement.GetGeneratedKeys;
import org.jdbi.v3.sqlobject.statement.SqlQuery;
import org.jdbi.v3.sqlobject.statement.SqlUpdate;

@RegisterBeanMapper(Categoria.class)
public interface CategoriaDao {

    @GetGeneratedKeys
    @SqlUpdate("insert into categoria (nome) values (:nome)")
    int insert(@BindBean Categoria categoria);

    /**
     *
     * @param idCategoria
     * @return
     */
    @SqlQuery("select * "
            + " from categoria "
            + " where idCategoria = :idCategoria;")
    Categoria findById(@Bind("idCategoria") int idCategoria);

    @SqlQuery("select * "
            + " from Categoria "
            + " order by nome;")
    List<Categoria> getAll();

    @SqlUpdate("update categoria "
            + " set nome = :nome"
            + " where idCategoria = :idCategoria;")
    int update(@BindBean Categoria categoria);

    @SqlUpdate("delete "
            + " from Categoria "
            + " where idCategoria = :idCategoria;")
    int delete(@Bind("idCategoria") int idCategoria);

}
