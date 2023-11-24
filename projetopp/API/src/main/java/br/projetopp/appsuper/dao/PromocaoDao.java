/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.projetopp.appsuper.dao;

import br.projetopp.appsuper.model.Promocao;
import br.projetopp.appsuper.model.Usuario;

import java.util.List;
import org.jdbi.v3.sqlobject.config.RegisterBeanMapper;
import org.jdbi.v3.sqlobject.customizer.BindBean;
import org.jdbi.v3.sqlobject.customizer.Bind;
import org.jdbi.v3.sqlobject.statement.GetGeneratedKeys;
import org.jdbi.v3.sqlobject.statement.SqlQuery;
import org.jdbi.v3.sqlobject.statement.SqlUpdate;

@RegisterBeanMapper(Promocao.class)
public interface PromocaoDao {

        @GetGeneratedKeys
        @SqlUpdate("insert into promocao (idUsuario, idCategoria, idSupermercado, nome, valor, dataInicio, dataTermino, relevancia, status, descricao, foto) values (:idUsuario, :idCategoria, :idSupermercado, :nome, :valor, :dataInicio, :dataTermino, :relevancia, :status, :descricao, :foto)")
        int insert(@BindBean Promocao promocao);

        /**
         *
         * @param idPromocao
         * 
         * @return
         */
        @SqlQuery("select * "
                        + " from promocao "
                        + " where idPromocao = :idPromocao;")
        Promocao findById(@Bind("idPromocao") int idPromocao);

        @SqlQuery("select * "
                        + " from promocao "
                        + " order by nome;")
        List<Promocao> getAll();

        @SqlQuery("select * "
                        + " from promocao "
                        + " where idUsuario = :idUsuario "
                        + " order by nome;")
        List<Promocao> getAllByUsuario(@BindBean Usuario usuario);

        @SqlQuery("select *"
                        + " from promocao"
                        + " where idUsuario = :idUsuario"
                        + " order by nome;")
        List<Promocao> getAllByUsuario(@Bind("idUsuario") int idUsuario);

        @SqlQuery("select * "
                        + " from promocao "
                        + " where nome like :nome "
                        + " order by nome;")
        List<Promocao> getAllByName(@Bind("nome") String nome);

        @SqlUpdate("update promocao "
                        + " set nome = :nome, "
                        + "idUsuario = :idUsuario," + "idCategoria = :idCategoria,"
                        + "idSupermercado = :idSupermercado," + "nome = :nome," + "valor = :valor,"
                        + "dataInicio = :dataInicio," + "dataTermino = :dataTermino," + "relevancia = :relevancia,"
                        + "status = :status," + "descricao = :descricao," + "foto = :foto"
                        + " where idPromocao = :idPromocao;")
        int update(@BindBean Promocao promocao);

        @SqlUpdate("delete "
                        + " from promocao "
                        + " where idPromocao = :idPromocao;")
        int delete(@Bind("idPromocao") int idPromocao);

        @SqlQuery("select *"
                        + " from promocao"
                        + " where (idCategoria = :idCategoria OR 0 = :idCategoria) "
                        + " and (idSupermercado = :idSupermercado OR 0 = :idSupermercado) "
                        + " and (nome like :searchField OR '%%' like :searchField);")
        List<Promocao> find(@Bind("idCategoria") int idCategoria, @Bind("idSupermercado") int idSupermercado,
                        @Bind("searchField") String searchField);

        @SqlQuery("select *"
                        + " from promocao"
                        + " where dataInicio = :date;")
        List<Promocao> findToday(String date);

        @SqlQuery("select promocao.*"
                        + " from promocao"
                        + " INNER JOIN favorito ON promocao.idPromocao = favorito.idPromocao and favorito.idUsuario = :idUsuario;")
        List<Promocao> getAllSavedByUsuario(@Bind("idUsuario") int idUsuario);

        // @SqlUpdate("update promocao"
        //                 + " set foto = :foto "
        //                 + " where idPromocao = :idPromocao;")
        // int updateFoto(@Bind int idPromocao, @Bind String foto);

        @SqlUpdate("update promocao set relevancia = " +
        "ifnull (((select count(1) from avaliacao where idPromocao = :idPromocao and nota = 1/ " +
        "(select count(1) from avaliacao where idPromocao = :idPromocao)) * 100), 0)" +
        "where idPromocao = :idPromocao;")
        int updateRelevancia(@Bind("idPromocao") int idPromocao);
}
