/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.projetopp.appsuper.dao;

import br.projetopp.appsuper.model.Supermercado;
import java.util.List;
import org.jdbi.v3.sqlobject.config.RegisterBeanMapper;
import org.jdbi.v3.sqlobject.customizer.BindBean;
import org.jdbi.v3.sqlobject.customizer.Bind;
import org.jdbi.v3.sqlobject.statement.GetGeneratedKeys;
import org.jdbi.v3.sqlobject.statement.SqlQuery;
import org.jdbi.v3.sqlobject.statement.SqlUpdate;

@RegisterBeanMapper(Supermercado.class)
public interface SupermercadoDao {

        @GetGeneratedKeys
        @SqlUpdate("insert into supermercado (nome, descricao) values (:nome, :descricao)")
        int insert(@BindBean Supermercado supermercado);

        /**
         *
         * @param idSupermercado
         * @return
         */
        @SqlQuery("select * "
                        + " from supermercado "
                        + " where idSupermercado = :idSupermercado;")
        Supermercado findById(@Bind("idSupermercado") int idSupermercado);

        @SqlQuery("select *"
                        + " from supermercado"
                        + " order by nome;")
        List<Supermercado> getAll();

        @SqlQuery("select * "
                        + " from supermercado "
                        + " where nome like :nome "
                        + " order by nome;")
        List<Supermercado> getAllByName(@Bind("nome") String nome);

        @SqlUpdate("update supermercado "
                        + " set nome = :nome, "
                        + "     descricao = :descricao"
                        + " where idSupermercado = :idSupermercado;")
        int update(@BindBean Supermercado supermercado);

        @SqlUpdate("delete "
                        + " from supermercado "
                        + " where idSupermercado = :idSupermercado;")
        int delete(@Bind("idSupermercado") int idSupermercado);

}
