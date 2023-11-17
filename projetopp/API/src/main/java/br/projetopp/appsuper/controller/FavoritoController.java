package br.projetopp.appsuper.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.projetopp.appsuper.model.Favorito;
import br.projetopp.appsuper.model.Promocao;
import br.projetopp.appsuper.service.FavoritoService;
import br.projetopp.appsuper.service.PromocaoService;

@RestController
@RequestMapping("/api/v1/favorito")
@CrossOrigin("*")
public class FavoritoController {
    private final FavoritoService favoritoService;

    public FavoritoController(FavoritoService favoritoService, PromocaoService promocaoService) {
        this.favoritoService = favoritoService;
    }

    @PostMapping({ "", "/" })
    public Favorito insert(@RequestBody Favorito Favorito) {
        return favoritoService.insert(Favorito);
    }

    @PutMapping({ "", "/" })
    public Favorito update(@RequestBody Favorito Favorito) {
        favoritoService.update(Favorito);
        return Favorito;
    }

    @GetMapping("/{idUsuario}/{idPromocao}")
    public Favorito findByIdUsuarioIdPromocao(@PathVariable("idUsuario") int idUsuario,
            @PathVariable("idPromocao") int idPromocao) {
        return favoritoService.findByIdUsuarioIdPromocao(idUsuario, idPromocao);
    }

    @GetMapping("/usuario/{idUsuario}")
    public List<Promocao> getAllSavedByUsuario(@PathVariable("idUsuario") int idUsuario) {
        return favoritoService.getAllSavedByUsuario(idUsuario);
    }

    @DeleteMapping("/{idUsuario}/{idPromocao}")
    public Favorito delete(@PathVariable("idUsuario") int idUsuario, @PathVariable("idPromocao") int idPromocao) {
        Favorito favorito = favoritoService.findByIdUsuarioIdPromocao(idUsuario, idPromocao);
        if (favorito == null) {
            throw new RuntimeException("Nao existe supermercado com este id para ser excluido....");
        }

        favoritoService.delete(favorito.getIdFavorito());
        return favorito;
    }
}
