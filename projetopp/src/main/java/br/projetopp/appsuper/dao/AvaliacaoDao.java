/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.projetopp.appsuper.dao;

import br.projetopp.appsuper.model.Avaliacao;

import java.util.List;

import org.jdbi.v3.sqlobject.config.RegisterBeanMapper;
import org.jdbi.v3.sqlobject.customizer.BindBean;
import org.jdbi.v3.sqlobject.customizer.Bind;
import org.jdbi.v3.sqlobject.statement.GetGeneratedKeys;
import org.jdbi.v3.sqlobject.statement.SqlQuery;
import org.jdbi.v3.sqlobject.statement.SqlUpdate;

@RegisterBeanMapper(Avaliacao.class)
public interface AvaliacaoDao {

        @GetGeneratedKeys
        @SqlUpdate("insert into avaliacao (idUsuario, idPromocao, nota) values (:idUsuario, :idPromocao, :nota)")
        int insert(@BindBean Avaliacao avaliacao);

        @SqlQuery("select * "
                        + " from avaliacao"
                        + " where idAvaliacao = :idAvaliacao;")
        Avaliacao findById(@Bind("idAvaliacao") int idAvaliacao);

        @SqlQuery("select count(1)"
                        + " from avaliacao"
                        + " where idPromocao = :idPromocao;")
        int getNumberTotalAvaliacoes(@Bind("idPromocao") int idPromocao);

        // @SqlUpdate("update promocao"
        //                 + " set relevancia = (select (SUM(nota) / count(idPromocao))"
        //                 + " from avaliacao where idPromocao = :idPromocao),"
        //                 + " where idPromocao = :idPromocao;")
        // int updateRelevancia(@Bind("idPromocao") int idPromocao);

        @SqlUpdate("update avaliacao "
                        + " set idUsuario = :idUsuario, "
                        + "     idPromocao = :idPromocao ," + "nota = :nota"
                        + " where idAvaliacao = :idAvaliacao;")
        int update(@BindBean Avaliacao avaliacao);

        @SqlUpdate("delete "
                        + " from avaliacao "
                        + " where idAvaliacao = :idAvaliacao;")
        int delete(@Bind("idAvaliacao") int idAvaliacao);

        @SqlQuery("select * "
                        + " from avaliacao "
                        + " where idUsuario = :idUsuario and idPromocao = :idPromocao;")
        Avaliacao findByIdUsuarioIdPromocao(@Bind("idUsuario") int idUsuario, @Bind("idPromocao") int idPromocao);

        @SqlQuery("select * "
                        + " from avaliacao "
                        + " where idPromocao = :idPromocao;")
        List<Avaliacao> findByIdPromocao(@Bind("idPromocao") int idPromocao);
}
