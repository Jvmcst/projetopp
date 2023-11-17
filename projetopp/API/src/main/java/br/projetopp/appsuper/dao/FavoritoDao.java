/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.projetopp.appsuper.dao;

import br.projetopp.appsuper.model.Favorito;
import org.jdbi.v3.sqlobject.config.RegisterBeanMapper;
import org.jdbi.v3.sqlobject.customizer.BindBean;
import org.jdbi.v3.sqlobject.customizer.Bind;
import org.jdbi.v3.sqlobject.statement.GetGeneratedKeys;
import org.jdbi.v3.sqlobject.statement.SqlQuery;
import org.jdbi.v3.sqlobject.statement.SqlUpdate;

@RegisterBeanMapper(Favorito.class)
public interface FavoritoDao {

        @GetGeneratedKeys
        @SqlUpdate("insert into favorito (idUsuario, idPromocao) values (:idUsuario, :idPromocao)")
        int insert(@BindBean Favorito favorito);

        /**
         *
         * @param idFavorito
         * @return
         */
        @SqlQuery("select * "
                        + " from favorito "
                        + " where idFavorito = :idFavorito;")
        Favorito findById(@Bind("idFavorito") int idFavorito);

        @SqlUpdate("update Favorito "
                        + " set idUsuario = :idUsuario, "
                        + "     idPromocao = :idPromocao"
                        + " where idFavorito = :idFavorito;")
        int update(@BindBean Favorito favorito);

        @SqlUpdate("delete "
                        + " from Favorito "
                        + " where idFavorito = :idFavorito;")
        int delete(@Bind("idFavorito") int idFavorito);

        @SqlQuery("select * "
                        + " from Favorito "
                        + " where idUsuario = :idUsuario and idPromocao = :idPromocao;")
        Favorito findByIdUsuarioIdPromocao(@Bind("idUsuario") int idUsuario, @Bind("idPromocao") int idPromocao);
}
