package br.projetopp.appsuper.controller;

import br.projetopp.appsuper.model.Promocao;
import br.projetopp.appsuper.service.PromocaoService;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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

    String uploadDirectory = "c:\\savefotos\\";

    @PostMapping(path = "/foto/{id}", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<Object> saveEmployee(@RequestParam("file") MultipartFile document, @PathVariable int id) {
        try {

            // Gere um nome de arquivo único com UUID
            java.util.UUID uuid = java.util.UUID.randomUUID();
            String fileName = uuid.toString();

            // Nome do arquivo
            // String fileName = "teste";
            String originalFileName = document.getOriginalFilename();
            String fileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));

            // Construa o caminho completo para o arquivo
            // java.nio.file.Path filePath = Paths.get(uploadDirectory, fileName);

            // Salve o arquivo no diretório
            File file = new File(uploadDirectory, fileName + fileExtension);
            document.transferTo(file);

            // Salve apenas o caminho no banco de dados...
            String imageUrl = uploadDirectory + "\\" + fileName + fileExtension;
            // FotoFesta foto = new FotoFesta();
            // foto.setUrl(imageUrl); // Salvar o URL no objeto Foto
            promocaoService.fotoUpdate(id, fileName);
            return ResponseEntity.status(HttpStatus.OK).body("Sucesso");
        } catch (IOException e) {
            // Tratar exceção de leitura de arquivo
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao processar o arquivo.");
        }
    }
}