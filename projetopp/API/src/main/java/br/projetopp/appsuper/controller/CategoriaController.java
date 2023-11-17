package br.projetopp.appsuper.controller;

import br.projetopp.appsuper.model.Categoria;
import br.projetopp.appsuper.service.CategoriaService;
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
@RequestMapping("/api/v1/categoria")
@CrossOrigin("*")
public class CategoriaController {

    private final CategoriaService categoriaService;

    public CategoriaController(CategoriaService categoriaService) {
        this.categoriaService = categoriaService;
    }

    @GetMapping({ "/", "" })
    public List<Categoria> list() {
        return categoriaService.getAll();
    }

    @GetMapping("/{idCategoria}")
    public Categoria findByIdCategoria(@PathVariable("idCategoria") int idCategoria) {
        return categoriaService.findById(idCategoria);
    }

    @PostMapping({ "", "/" })
    public Categoria insertCategoria(@RequestBody Categoria categoria) {
        return categoriaService.insert(categoria);
    }

    @PutMapping({ "", "/" })
    public Categoria updateCategoria(@RequestBody Categoria categoria) {
        categoriaService.update(categoria);
        return categoria;
    }

    @DeleteMapping("/{idCategoria}")
    public Categoria deleteCategoria(@PathVariable("idCategoria") int idCategoria) {
        Categoria categoria = categoriaService.findById(idCategoria);
        if (categoria == null) {
            throw new RuntimeException("Nao existe Categoria com este id para ser excluido....");
        }
        categoriaService.delete(idCategoria);
        return categoria;
    }
}