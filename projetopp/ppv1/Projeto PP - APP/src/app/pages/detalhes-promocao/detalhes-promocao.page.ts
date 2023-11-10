import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Avaliacao } from 'src/app/model/avaliacao';
import { Categoria } from 'src/app/model/categoria';
import { Favorito } from 'src/app/model/favorito';
import { Promocao } from 'src/app/model/promocao';
import { Supermercado } from 'src/app/model/supermercado';
import { AvaliacaoService } from 'src/app/services/avaliacao.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { FavoritoService } from 'src/app/services/favorito.service';
import { PromocaoService } from 'src/app/services/promocao.service';
import { SupermercadoService } from 'src/app/services/supermercado.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-detalhes-promocao',
  templateUrl: './detalhes-promocao.page.html',
  styleUrls: ['./detalhes-promocao.page.scss'],
})
export class DetalhesPromocaoPage implements OnInit {
  promocao: Promocao;
  supermercado: Supermercado;
  categoria: Categoria;
  darkTheme: boolean = false;
  isSession: boolean;
  isLike!: boolean;
  isDeslike!: boolean;
  iconDeslike: string;
  iconLike: string;
  isFavorite!: boolean;
  iconFavorite: string;
  nameButton: string;
  favorito: Favorito;
  avaliacao: Avaliacao;
  numberTotal: number;

  constructor(private avaliacaoService: AvaliacaoService, private toastController: ToastController, private favoritoService: FavoritoService, private usuarioService: UsuarioService, private renderer: Renderer2, private activatedRoute: ActivatedRoute, private categoriaService: CategoriaService, private supermercadoService: SupermercadoService, private promocaoService: PromocaoService) {
    this.isSession = false;
    this.iconLike = "thumbs-up-outline";
    this.iconDeslike = "thumbs-down-outline";
    this.iconFavorite = "star-outline";
    this.nameButton = "Favoritar";

    this.favorito = new Favorito();
    this.promocao = new Promocao();
    this.supermercado = new Supermercado();
    this.categoria = new Categoria();
    this.avaliacao = new Avaliacao();

    this.numberTotal = 0;

    let idPromocao = this.activatedRoute.snapshot.params['id'];
    if (idPromocao != null) {
      this.promocaoService.findByIdPromocao(idPromocao).then((json) => {
        this.promocao = <Promocao>(json);

        if (this.usuarioService.recoverIdUsuario() !== 0 && !(Number.isNaN(this.usuarioService.recoverIdUsuario()))) {
          this.isSession = true;

          this.favoritoService.findByIdUsuarioIdPromocao(this.usuarioService.recoverIdUsuario(), this.promocao.idPromocao).then((json) => {
            let favorito = <Favorito>(json);

            if (favorito !== null) {
              this.favorito = favorito;
              this.iconFavorite = "star";
              this.nameButton = "Favorito";
              this.isFavorite = true;
            }
          })

          this.avaliacaoService.findByIdUsuarioIdPromocao(this.usuarioService.recoverIdUsuario(), this.promocao.idPromocao).then((json) => {
            let avaliacao = <Avaliacao>(json);

            if (avaliacao !== null) {
              this.avaliacao = avaliacao;

              if (this.avaliacao.nota === 1) {
                this.iconDeslike = "thumbs-down-outline";
                this.iconLike = "thumbs-up";
                this.isDeslike = false;
                this.isLike = true;
              } else {
                this.iconDeslike = "thumbs-down";
                this.iconLike = "thumbs-up-outline";
                this.isDeslike = true;
                this.isLike = false;
              }
            }
          })

          this.avaliacaoService.getAllNumberAvaliacoes(this.promocao.idPromocao).then((json) => {
            this.numberTotal = <number>(json);
          })
        }

        this.supermercadoService.findByIdSupermercado(this.promocao.idSupermercado).then((json) => {
          this.supermercado = <Supermercado>(json);
        });

        this.categoriaService.findByIdCategoria(this.promocao.idCategoria).then((json) => {
          this.categoria = <Categoria>(json);
        });

      });
    }
  }

  mudarTema() {
    this.darkTheme = !this.darkTheme; // Toggle the current theme
    if (this.darkTheme) {
      this.renderer.setAttribute(document.body, 'color-theme', 'dark');
    } else {
      this.renderer.setAttribute(document.body, 'color-theme', 'light');
    }
  }

  formatDate(date: string){
    let result = date.split("-");
    return result[2] + "/" + result[1] + "/" + result[0];
  }

  ngOnInit() {
  }

  async loadList() {
    let idPromocao = this.activatedRoute.snapshot.params['id'];

    if (idPromocao != null) {
      this.promocaoService.findByIdPromocao(idPromocao).then((json) => {
        this.promocao = <Promocao>(json);
      });

      this.avaliacaoService.getAllNumberAvaliacoes(this.promocao.idPromocao).then((json) => {
        this.numberTotal = <number>(json);
      })
    }
  }

  evaluate(value: string) {
    // this.avaliacao.idPromocao = this.promocao.idPromocao;
    // this.avaliacao.idUsuario = this.usuarioService.recoverIdUsuario();

    if ((value === 'like' && this.isLike) || (value === 'deslike' && this.isDeslike)) {
      this.iconLike = "thumbs-up-outline";
      this.iconDeslike = "thumbs-down-outline";
      this.isLike = false;
      this.isDeslike = false;

      // this.avaliacaoService.remove(this.usuarioService.recoverIdUsuario(), this.promocao.idPromocao).catch(() => {
      //   this.showMessage('Erro ao remover avaliação.');
      // });

      // this.loadList();
      return;
    }



    if (this.isLike || (!this.isDeslike && value === 'deslike')) {
      // this.avaliacao.nota = -1;

      // this.avaliacaoService.saveAvaliacao(this.avaliacao).then((json) => {
      //   if (!<Avaliacao>(json)) {
      //     this.showMessage('Erro ao avaliar!')
      //   } else {

          this.iconLike = "thumbs-up-outline";
          this.iconDeslike = "thumbs-down";
          this.isLike = false;
          this.isDeslike = true;
      //   }
      // })

      // this.loadList();

      return;
    } else {
      // this.avaliacao.nota = 1;

      // this.avaliacaoService.saveAvaliacao(this.avaliacao).then((json) => {
      //   if (!<Avaliacao>(json)) {
      //     this.showMessage('Erro ao avaliar!')
      //   } else {
          this.iconLike = "thumbs-up";
          this.iconDeslike = "thumbs-down-outline";
          this.isLike = true;
          this.isDeslike = false;
      //   }
      // // })
    }

    this.loadList();
  }

  save() {
    if (!this.isFavorite) {
      this.iconFavorite = "star";
      this.nameButton = "Favorito"
      this.isFavorite = true;

      this.favorito.idPromocao = this.promocao.idPromocao;
      this.favorito.idUsuario = this.usuarioService.recoverIdUsuario();

      this.favoritoService.saveFavorito(this.favorito).then((json) => {
        if (!<Favorito>(json)) {
          this.showMessage('Erro ao favoritar!')
        }
      })
      return;
    } else {
      this.iconFavorite = "star-outline";
      this.nameButton = "Favoritar"
      this.isFavorite = false;

      this.favoritoService.remove(this.usuarioService.recoverIdUsuario(), this.promocao.idPromocao).catch(() => {
        this.showMessage('Erro ao desfavoritar.');
      });
    }
  }

  async showMessage(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present();
  }
}