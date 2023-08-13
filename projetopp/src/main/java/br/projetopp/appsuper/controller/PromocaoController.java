package br.projetopp.appsuper.controller;

import br.projetopp.appsuper.model.Promocao;
import br.projetopp.appsuper.service.PromocaoService;
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
@RequestMapping("/api/v1/promocao")
public class PromocaoController {

    private final PromocaoService promocaoService;

    public PromocaoController(PromocaoService promocaoService){
        this.promocaoService = promocaoService;
    }

    @GetMapping({"/", ""})
    public List<Promocao> consultarTodos(){
        List<Promocao> promocaoList = promocaoService.consultarTodos();
        return promocaoList;
    }

    @GetMapping("/{id}")
    public Promocao consultarProduto(@PathVariable("id") int id){
        Promocao ret = promocaoService.consultarPorId(id);
        return ret;
    }

    @PostMapping({"", "/"})
    public Promocao inserir(@RequestBody Promocao promocao){
        Promocao ret = promocaoService.inserir(promocao);
        return ret;
    }

    @PutMapping({"", "/"})
    public Promocao alterar(@RequestBody Promocao promocao){
        promocaoService.alterar(promocao);
        return promocao;
    }

    @DeleteMapping("/{id}")
    public Promocao alterar(@PathVariable("id") int id){
        Promocao promocao = promocaoService.consultarPorId(id);
        if (promocao == null){
            throw new RuntimeException("Nao existe promocao com este id para ser excluido....");
        }
        promocaoService.excluir(id);
        return promocao;
    }
}