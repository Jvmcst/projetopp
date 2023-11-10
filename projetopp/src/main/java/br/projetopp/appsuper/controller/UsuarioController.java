package br.projetopp.appsuper.controller;

import br.projetopp.appsuper.model.Usuario;
import br.projetopp.appsuper.service.UsuarioService;

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
@RequestMapping("/api/v1/usuario")
@CrossOrigin("*")
public class UsuarioController {
    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService){
        this.usuarioService = usuarioService;
    }

    @GetMapping({"/", ""})
    public List<Usuario> list(){
        return usuarioService.getAll();
    }

    @GetMapping("/{idUsuario}")
    public Usuario findByIdUsuario(@PathVariable("idUsuario") int idUsuario){
        return usuarioService.findById(idUsuario);
    }

    @PostMapping({"", "/"})
    public Usuario insertUsuario(@RequestBody Usuario usuario){
        return usuarioService.insert(usuario);
    }

    @PutMapping({"", "/"})
    public Usuario updateUsuario(@RequestBody Usuario usuario){
        usuarioService.update(usuario);
        return usuario;
    }

    @GetMapping("/email/{email}/exists")
    public boolean checkEmail(@PathVariable("email") String email) {
        Usuario usuario = usuarioService.getUserByEmail(email);

        if (usuario != null && usuario.getEmail().equals(email)) {
            return true;
        } 
        return false;
    }

    @GetMapping("/recover/{idUsuario}")
    public void recoverSenha(@PathVariable("idUsuario") int idUsuario) {
        usuarioService.recoverSenha(idUsuario);
    }

    @GetMapping("/dev/{email}/authenticate")
    public boolean checkDev(@PathVariable("email") String email) {
        Usuario usuario = usuarioService.getDevByEmail(email);

        if (usuario != null && usuario.getEmail().equals(email)) {
            return true;
        }
        return false;
    }

    @GetMapping("/{email}/{senha}/authenticate")
    public Usuario authenticate(@PathVariable("email") String email, @PathVariable("senha") String senha) {
        Usuario usuario = usuarioService.getUserByEmail(email);

        if (usuario != null && usuario.getEmail().equals(email) && usuario.getSenha().equals(senha)) {
            return usuario;
        } else
            return null;
    }

    @DeleteMapping("/{idUsuario}")
    public Usuario deleteUsuario(@PathVariable("idUsuario") int idUsuario){
        Usuario usuario = usuarioService.findById(idUsuario);
        if (usuario == null){
            throw new RuntimeException("Nao existe aluno com este id para ser excluido....");
        }
        usuarioService.delete(idUsuario);
        return usuario;
    }
}