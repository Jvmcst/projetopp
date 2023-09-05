/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.projetopp.appsuper.controller;

import br.projetopp.appsuper.model.Promocao;
import br.projetopp.appsuper.model.UsuarioPromo;
import br.projetopp.appsuper.service.UsuarioPromoService;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


/**
 *
 * @author jv111
 */

@RestController
@RequestMapping("/api/v1/{idUsuario}/promocao")
@CrossOrigin("*")
public class UsuarioPromoController {
    private final UsuarioPromoService usuariopromoservice;
    
    public UsuarioPromoController(UsuarioPromoService usuariopromoservice) {
        this.usuariopromoservice = usuariopromoservice;
    }

    @GetMapping({"/", ""})
    public List<Promocao> getByUsuario(@PathVariable("idUsuario") int idUsuario) {
        List<Promocao> promocaoList = usuariopromoservice.getByUsuario(idUsuario);
        return promocaoList;
    }

    @GetMapping("/{idPromocao}")
    public Promocao get(@PathVariable("idUsuario") int idUsuario,
            @PathVariable("idPromocao") int idPromocao) {
        Promocao promocao = usuariopromoservice.get(idUsuario, idPromocao);
        return promocao;
    }

    @PostMapping({"", "/"})
    public Promocao insert(@RequestBody UsuarioPromo usuariopromo) {
        Promocao promocao = usuariopromoservice.insert(usuariopromo);
        return promocao;
    }

    @DeleteMapping({"", "/"})
    public List<Promocao> deleteByUsuario(@PathVariable("idUsuario") int idUsuario) {
        List<Promocao> promocaoList = usuariopromoservice.getByUsuario(idUsuario);
        if (promocaoList == null || promocaoList.isEmpty()) {
            throw new RuntimeException("Nao existe usuario com este id para ser excluido....");
        }
        usuariopromoservice.deleteByUsuario(idUsuario);
        return promocaoList;
    }

    @DeleteMapping("/{idPromocao}")
    public Promocao delete(
            @PathVariable("idUsuario") int idUsuario,
            @PathVariable("idPromocao") int idPromocao
    ) {
        Promocao promocao = usuariopromoservice.get(idUsuario, idPromocao);
        if (promocao == null) {
            throw new RuntimeException("Nao existe promocao com este id para ser excluido....");
        }
        usuariopromoservice.delete(idUsuario, idPromocao);
        return promocao;
    }
}
