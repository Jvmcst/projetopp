package br.projetopp.appsuper.controller;

import br.projetopp.appsuper.model.Supermercado;
import br.projetopp.appsuper.service.SupermercadoService;

import java.util.List;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/supermercado")
public class SupermercadoController {

    private final SupermercadoService supermercadoService;

    public SupermercadoController(SupermercadoService supermercadoService) {
        this.supermercadoService = supermercadoService;
    }

    @GetMapping({ "/", "" })
    public List<Supermercado> consultarTodos() {
        List<Supermercado> supermercadoList = supermercadoService.consultarTodos();
        return supermercadoList;
    }

    @GetMapping("/{id}")
    public Supermercado consultarSupermercado(@PathVariable("id") int id) {
        Supermercado ret = supermercadoService.consultarPorId(id);
        return ret;
    }

    @PostMapping({ "", "/" })
    public Supermercado inserir(@RequestBody Supermercado supermercado) {
        Supermercado ret = supermercadoService.inserir(supermercado);
        return ret;
    }

    @PutMapping({ "", "/" })
    public Supermercado alterar(@RequestBody Supermercado supermercado) {
        supermercadoService.alterar(supermercado);
        return supermercado;
    }

    @DeleteMapping("/{id}")
    public Supermercado alterar(@PathVariable("id") int id) {
        Supermercado supermercado = supermercadoService.consultarPorId(id);
        if (supermercado == null) {
            throw new RuntimeException("Nao existe supermercado com este id para ser excluido....");
        }
        supermercadoService.excluir(id);
        return supermercado;
    }
}
