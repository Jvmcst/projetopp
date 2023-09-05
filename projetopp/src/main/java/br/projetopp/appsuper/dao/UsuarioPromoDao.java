/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package br.projetopp.appsuper.dao;

import br.projetopp.appsuper.model.Promocao;
import br.projetopp.appsuper.model.UsuarioPromo;
import java.util.List;
import org.jdbi.v3.sqlobject.config.RegisterBeanMapper;
import org.jdbi.v3.sqlobject.customizer.Bind;
import org.jdbi.v3.sqlobject.customizer.BindBean;
import org.jdbi.v3.sqlobject.statement.SqlQuery;
import org.jdbi.v3.sqlobject.statement.SqlUpdate;

/**
 *
 * @author jv111
 */
@RegisterBeanMapper(UsuarioPromo.class)
@RegisterBeanMapper(Promocao.class)
public interface UsuarioPromoDao {
     @SqlUpdate("insert into usuariopromo (idUsuario, idPromocao) values (:idUsuario, :idPromocao)")
        void insert(@BindBean UsuarioPromo usuariopromo);

        @SqlQuery("select a.* " +
                        " from promocao a, usuariopromo up " +
                        " where up.idPromocao = a.idPromocao " +
                        "   and up.idUsuario = :idUsuario " +
                        "   and up.idPromocao = :idPromocao;")
        Promocao get(@Bind("idUsuario") int idUsuario, @Bind("idPromocao") int idPromocao);

        @SqlQuery("select a.* " +
                        " from promocao a, usuariopromo up " +
                        " where up.idPromocao = a.idPromocao " +
                        "   and up.idUsuario = :idUsuario;")
        List<Promocao> getByUsuario(@Bind("idUsuario") int idUsuario);

        @SqlUpdate("delete " +
                        " from usuariopromo " +
                        " where idUsuario = :idUsuario " +
                        "   and idPromocao = :idPromocao;")
        int delete(@Bind("idUsuario") int idUsuario, @Bind("idPromocao") int idPromocao);

        @SqlUpdate("delete " +
                        " from usuariopromo " +
                        " where idUsuario = :idUsuario;")
        int deleteByUsuario(@Bind("idUsuario") int idUsuario);
}
