import { Component, OnInit, Renderer2 } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Promocao } from 'src/app/model/promocao';
import { Supermercado } from 'src/app/model/supermercado';
import { FavoritoService } from 'src/app/services/favorito.service';
import { PromocaoService } from 'src/app/services/promocao.service';
import { SupermercadoService } from 'src/app/services/supermercado.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-meus-salvos',
  templateUrl: './meus-salvos.page.html',
  styleUrls: ['./meus-salvos.page.scss'],
})
export class MeusSalvosPage implements OnInit {
  promocaos: Promocao[];
  supermercados: Supermercado[];
  darkTheme: boolean = false;

  constructor(private promocaoService: PromocaoService, private supermercadoService: SupermercadoService, private usuarioService: UsuarioService, private renderer: Renderer2, private favoritoService: FavoritoService, private loadingController: LoadingController) {
    this.promocaos = [];
    this.supermercados = [];
  }

  mudarTema() {
    this.darkTheme = !this.darkTheme; // Toggle the current theme
    if (this.darkTheme) {
      this.renderer.setAttribute(document.body, 'color-theme', 'dark');
      // src: "assets/icon/logo1.png";
    } else {
      this.renderer.setAttribute(document.body, 'color-theme', 'light'); // Assuming you have a 'light' theme defined as well
      // src:"assets/icon/logo.png";
    }
  }

  findName(id: number) {
    for (let supermercado of this.supermercados) {
      if (supermercado.idSupermercado === id) {
        return supermercado.nome;
      }
    }
    return;
  }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.loadList();
  }

  async loadList() {
    this.showLoader();

    await this.favoritoService.findByIdUsuario(this.usuarioService.recoverIdUsuario()).then((json) => {
      this.promocaos = <Promocao[]>(json);
    });

    await this.supermercadoService.list().then((json) => {
      this.supermercados = <Supermercado[]>(json);
    });

    this.closeLoader();
  }

  showLoader() {
    this.loadingController.create({
      message: 'Carregando...'
    }).then((res) => {
      res.present();
    })
  }

  closeLoader() {
    setTimeout(() => {
      this.loadingController.dismiss().then(() => {
      }).catch((erro) => {
        console.log('Erro: ', erro)
      });
    }, 500);
  }
}