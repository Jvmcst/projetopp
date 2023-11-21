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

import br.projetopp.appsuper.model.Avaliacao;
import br.projetopp.appsuper.service.AvaliacaoService;

@RestController
@RequestMapping("/api/v1/avaliacao")
@CrossOrigin("*")
public class AvaliacaoController {
    private final AvaliacaoService avaliacaoService;

    public AvaliacaoController(AvaliacaoService avaliacaoService) {
        this.avaliacaoService = avaliacaoService;
    }

    @GetMapping("{idUsuario}/{idPromocao}")
    public Avaliacao findByIdUsuarioIdPromocao(@PathVariable("idUsuario") int idUsuario,
            @PathVariable("idPromocao") int idPromocao) {
        return avaliacaoService.findByIdUsuarioIdPromocao(idUsuario, idPromocao);
    }

    @GetMapping("/promocao/{idPromocao}")
    public List<Avaliacao> findByIdPromocao(@PathVariable("idPromocao") int idPromocao) {
        return avaliacaoService.findByIdPromocao(idPromocao);
    }

    @GetMapping("numberTotal/{idPromocao}")
    public int getNumberTotalAvaliacoes(@PathVariable("idPromocao") int idPromocao) {
        return avaliacaoService.getNumberTotalAvaliacoes(idPromocao);
    }

    @GetMapping("numberLikes/{idPromocao}")
    public int getAllNumberLikes(@PathVariable("idPromocao") int idPromocao) {
        return avaliacaoService.getAllNumberLikes(idPromocao);
    }

    @PostMapping({ "", "/" })
    public Avaliacao insert(@RequestBody Avaliacao avaliacao) {
        return avaliacaoService.insert(avaliacao);
    }

    @PutMapping({ "", "/" })
    public Avaliacao update(@RequestBody Avaliacao avaliacao) {
        avaliacaoService.update(avaliacao);
        return avaliacao;
    }

    @DeleteMapping("/{idUsuario}/{idPromocao}")
    public Avaliacao delete(@PathVariable("idUsuario") int idUsuario, @PathVariable("idPromocao") int idPromocao) {
        Avaliacao avaliacao = avaliacaoService.findByIdUsuarioIdPromocao(idUsuario, idPromocao);
        if (avaliacao == null) {
            throw new RuntimeException("Nao existe avaliacao com este id para ser excluido....");
        }
        avaliacaoService.delete(avaliacao);
        return avaliacao;
    }
}
