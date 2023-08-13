package br.projetopp.appsuper.controller;

import br.projetopp.appsuper.model.Usuario;
import br.projetopp.appsuper.service.UsuarioService;

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
@RequestMapping("/api/v1/usuario")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService){
        this.usuarioService = usuarioService;
    }

    @GetMapping({"/", ""})
    public List<Usuario> consultarTodos(){
        List<Usuario> usuarioList = usuarioService.consultarTodos();
        return usuarioList;
    }

    @GetMapping("/{id}")
    public Usuario consultarAluno(@PathVariable("id") int id){
        Usuario ret = usuarioService.consultarPorId(id);
        return ret;
    }

    @PostMapping({"", "/"})
    public Usuario inserir(@RequestBody Usuario usuario){
        Usuario ret = usuarioService.inserir(usuario);
        return ret;
    }

    @PutMapping({"", "/"})
    public Usuario alterar(@RequestBody Usuario usuario){
        usuarioService.alterar(usuario);
        return usuario;
    }

    @DeleteMapping("/{id}")
    public Usuario alterar(@PathVariable("id") int id){
        Usuario usuario = usuarioService.consultarPorId(id);
        if (usuario == null){
            throw new RuntimeException("Nao existe aluno com este id para ser excluido....");
        }
        usuarioService.excluir(id);
        return usuario;
    }
}