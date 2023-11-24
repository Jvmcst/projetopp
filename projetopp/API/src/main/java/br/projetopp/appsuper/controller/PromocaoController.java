package br.projetopp.appsuper.controller;

import br.projetopp.appsuper.model.Promocao;
import br.projetopp.appsuper.service.PromocaoService;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/promocao")
@CrossOrigin("*")
public class PromocaoController {
    private String uploadDirectory = "C:\\xampp\\htdocs\\img";
    private final PromocaoService promocaoService;

    public PromocaoController(PromocaoService promocaoService) {
        this.promocaoService = promocaoService;
    }

    @GetMapping({ "/", "" })
    public List<Promocao> getAll() {
        List<Promocao> promocaoList = promocaoService.getAll();
        return promocaoList;
    }

    @GetMapping("/relevancia/{idPromocao}")
    public Promocao updateRelevancia(@PathVariable("idPromocao") int idPromocao) {
        promocaoService.updateRelevancia(idPromocao);
        return promocaoService.findById(idPromocao);
    }

    @GetMapping("/{id}")
    public Promocao findById(@PathVariable("id") int id) {
        return promocaoService.findById(id);
    }

    @GetMapping("usuario/{idUsuario}")
    public List<Promocao> getAllByUsuario(@PathVariable("idUsuario") int idUsuario) {
        return promocaoService.getAllByUsuario(idUsuario);
    }

    @PostMapping({ "", "/" })
    public Promocao insertPromocao(@RequestBody Promocao promocao) {
        return promocaoService.insert(promocao);
    }

    @PutMapping({ "", "/" })
    public Promocao updatePromocao(@RequestBody Promocao promocao) {
        promocaoService.update(promocao);
        return promocao;
    }

    @GetMapping("/today")
    public List<Promocao> findToday() {
        return promocaoService.findToday();
    }

    @GetMapping("/search/{idCategoria}/{idSupermercado}/{searchField}")
    public List<Promocao> find(@PathVariable("idCategoria") int idCategoria,
            @PathVariable("idSupermercado") int idSupermercado, @PathVariable("searchField") String searchField) {

        if (searchField.equals("-")) {
            searchField = "";
        }
        searchField = "%" + searchField + "%";

        return promocaoService.find(idCategoria, idSupermercado, searchField);
    }

    @DeleteMapping("/{id}")
    public Promocao deletePromocao(@PathVariable("id") int id) {
        Promocao promocao = promocaoService.findById(id);
        if (promocao == null) {
            throw new RuntimeException("Nao existe promocao com este id para ser excluido....");
        }
        promocaoService.delete(id);
        return promocao;
    }

    @PostMapping(path = "/upload", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public void saveEmployee(@RequestParam("file") MultipartFile document) {
        try {
            String fileName = document.getOriginalFilename();
            File file = new File(uploadDirectory, fileName);
            document.transferTo(file);
            
            // String imageUrl = uploadDirectory + "\\" + fileName + fileExtension;
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}