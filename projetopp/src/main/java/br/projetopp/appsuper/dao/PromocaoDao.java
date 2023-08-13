/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.projetopp.appsuper.dao;

import br.projetopp.appsuper.model.Promocao;
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
    @SqlUpdate("insert into promocao (idUsuario, idCategoria, idSupermercado, nome, valor, dataPromocao, relevancia, statusPromocao, descricao, foto) values (:idUsuario, :idCategoria, :idSupermercado, :nome, :valor, :dataPromocao, :relevancia, :statusPromocao, :descricao, :foto)")
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
    Promocao get(@Bind("idPromocao") int idPromocao);

    @SqlQuery("select * "
            + " from promocao "
            + " order by nome;")
    List<Promocao> getAll();

    @SqlQuery("select * "
            + " from promocao "
            + " where nome like :nome "
            + " order by nome;")
    List<Promocao> getAllByName(@Bind("nome") String nome);

    @SqlUpdate("update promocao "
            + " set nome = :nome, "
            + "     idUsuario = :idUsuario " + "idCategoria = :idCategoria" + "idSupermercado = :idSupermercado" + "nome = :nome" + "valor = :valor" + "dataPromocao = :dataPromocao" + "relevancia = :relevancia" + "statusPromocao = :statusPromocao" + "descricao = :descricao" + "foto = :foto"
            + " where idPromocao = :idPromocao;")
    int update(@BindBean Promocao promocao);

    @SqlUpdate("delete "
            + " from promocao "
            + " where idPromocao = :idPromocao;")
    int delete(@Bind("idPromocao") int idPromocao);

}
