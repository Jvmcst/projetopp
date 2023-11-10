package br.projetopp.appsuper.controller;

import br.projetopp.appsuper.model.Supermercado;
import br.projetopp.appsuper.service.SupermercadoService;

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

@RestController
@RequestMapping("/api/v1/supermercado")
@CrossOrigin("*")
public class SupermercadoController {
    private final SupermercadoService supermercadoService;

    public SupermercadoController(SupermercadoService supermercadoService) {
        this.supermercadoService = supermercadoService;
    }

    @GetMapping({ "/", "" })
    public List<Supermercado> list() {
        return supermercadoService.getAll();
    }

    @GetMapping("/{idSupermercado}")
    public Supermercado findByIdSupermercado(@PathVariable("idSupermercado") int idSupermercado) {
        return supermercadoService.findById(idSupermercado);
    }

    @PostMapping({ "", "/" })
    public Supermercado insertSupermercado(@RequestBody Supermercado supermercado) {
        return supermercadoService.insert(supermercado);
    }

    @PutMapping({ "", "/" })
    public Supermercado updateSupermercado(@RequestBody Supermercado supermercado) {
        supermercadoService.update(supermercado);
        return supermercado;
    }

    @DeleteMapping("/{idSupermercado}")
    public Supermercado deleteSupermercado(@PathVariable("idSupermercado") int idSupermercado) {
        Supermercado supermercado = supermercadoService.findById(idSupermercado);
        if (supermercado == null) {
            throw new RuntimeException("Nao existe supermercado com este id para ser excluido....");
        }
        supermercadoService.delete(idSupermercado);
        return supermercado;
    }
}
