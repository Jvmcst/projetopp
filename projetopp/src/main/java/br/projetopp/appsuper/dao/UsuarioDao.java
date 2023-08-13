/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.projetopp.appsuper.dao;

import br.projetopp.appsuper.model.Usuario;
import java.util.List;
import org.jdbi.v3.sqlobject.config.RegisterBeanMapper;
import org.jdbi.v3.sqlobject.customizer.BindBean;
import org.jdbi.v3.sqlobject.customizer.Bind;
import org.jdbi.v3.sqlobject.statement.GetGeneratedKeys;
import org.jdbi.v3.sqlobject.statement.SqlQuery;
import org.jdbi.v3.sqlobject.statement.SqlUpdate;

@RegisterBeanMapper(Usuario.class)
public interface UsuarioDao {

    @GetGeneratedKeys
    @SqlUpdate("insert into usuario (nomeUsuario, email, senha, telefone, confiabilidadeUsuario) values (:nomeUsuario, :email, :senha, :telefone, :confiabilidadeUsuario)")
    int insert(@BindBean Usuario usuario);

    @SqlQuery("select * "
            + " from usuario "
            + " where idUsuario = :idUsuario;")
    Usuario get(@Bind("idUsuario") int idUsuario);

    @SqlQuery("select * "
            + " from usuario "
            + " order by nomeUsuario;")
    List<Usuario> getAll();

    @SqlQuery("select * "
            + " from usuario "
            + " where nomeUsuario like :nomeUsuario "
            + " order by nomeUsuario;")
    List<Usuario> getAllByName(@Bind("nomeUsuario") String nomeUsuario);

    @SqlUpdate("update usuario "
            + " set nomeUsuario = :nomeUsuario, "
            + "     email = :email " + "senha = :senha" + "telefone = :telefone" + "confiabilidadeUsuario = :confiabilidadeUsuario"
            + " where idUsuario = :idUsuario;")
    int update(@BindBean Usuario usuario);

    @SqlUpdate("delete "
            + " from usuario "
            + " where idUsuario = :idUsuario;")
    int delete(@Bind("idUsuario") int idUsuario);

}
