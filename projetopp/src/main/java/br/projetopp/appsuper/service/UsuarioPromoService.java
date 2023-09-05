/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.projetopp.appsuper.service;

import br.projetopp.appsuper.dao.UsuarioPromoDao;
import br.projetopp.appsuper.model.Promocao;
import br.projetopp.appsuper.model.UsuarioPromo;
import java.util.List;
import org.jdbi.v3.core.Jdbi;

/**
 *
 * @author jv111
 */
public class UsuarioPromoService {
    private final UsuarioPromoDao usuarioPromoDao;

    public UsuarioPromoService(Jdbi jdbi) {
       // super(jdbi);
        this.usuarioPromoDao = jdbi.onDemand(UsuarioPromoDao.class);
    }

    public UsuarioPromo insert(UsuarioPromo usuarioPromo) {
        usuarioPromoDao.insert(usuarioPromo);
        return usuarioPromo;
    }

    public List<Promocao> getByUsuario(int idUsuario) {
        List<Promocao> promocaoList = usuarioPromoDao.getByUsuario(idUsuario);

        for (Promocao promocao : promocaoList) {
//            promocao = this.getPromocao(promocao);
        }

        return promocaoList;
    }

    public Promocao get(int idUsuario, int idPromocao) {
    Promocao promocao = usuarioPromoDao.get(idUsuario, idPromocao);
//    promocao = this.getPromocao(promocao);
    return promocao;
    }

    public void delete(int idUsuario, int idPromocao) {
        usuarioPromoDao.delete(idUsuario, idPromocao);
    }

    public void deleteByUsuario(int idUsuario) {
        usuarioPromoDao.deleteByUsuario(idUsuario);
    }
}
