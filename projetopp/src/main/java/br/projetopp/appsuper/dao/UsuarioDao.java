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
        @SqlUpdate("insert into usuario (nome, email, senha, telefone, foto) values (:nome, :email, :senha, :telefone, :foto)")
        int insert(@BindBean Usuario usuario);

        @SqlQuery("select * "
                        + " from usuario "
                        + " where idUsuario = :idUsuario;")
        Usuario findById(@Bind("idUsuario") int idUsuario);

        @SqlQuery("select * "
                        + " from usuario "
                        + " order by nome;")
        List<Usuario> getAll();

        @SqlQuery("select * "
                        + " from usuario "
                        + " where nome like :nome "
                        + " order by nome;")
        List<Usuario> getAllByName(@Bind("nome") String nome);

        @SqlQuery("select * "
                        + "from usuario "
                        + " where email like :email;")
        Usuario getUserByEmail(@Bind("email") String email);

        @SqlUpdate("update usuario "
                        + " set nome = :nome, "
                        + "     email = :email ," + "senha = :senha," + "telefone = :telefone,"
                        + "foto = :foto"
                        + " where idUsuario = :idUsuario;")
        int update(@BindBean Usuario usuario);

        @SqlUpdate("delete "
                        + " from usuario "
                        + " where idUsuario = :idUsuario;")
        int delete(@Bind("idUsuario") int idUsuario);

        @SqlQuery("select * "
        + "from usuario "
        + "where email = :email "
        + "and (email = 'anaelisakb@gmail.com' or email = 'jv11102014@gmail.com' or email = 'thuliomarco3@gmail.com');")
        Usuario getDevByEmail(String email);

}
