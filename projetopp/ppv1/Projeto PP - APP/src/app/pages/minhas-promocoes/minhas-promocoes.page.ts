import { Component, OnInit, Renderer2 } from '@angular/core';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { Promocao } from 'src/app/model/promocao';
import { Supermercado } from 'src/app/model/supermercado';
import { PromocaoService } from 'src/app/services/promocao.service';
import { SupermercadoService } from 'src/app/services/supermercado.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-minhas-promocoes',
  templateUrl: './minhas-promocoes.page.html',
  styleUrls: ['./minhas-promocoes.page.scss'],
})
export class MinhasPromocoesPage implements OnInit {
  supermercados: Supermercado[];
  promocaos: Promocao[];
  darkTheme: boolean = false;

  constructor(private renderer: Renderer2, private toastController: ToastController, private alertController: AlertController, private promocaoService: PromocaoService, private supermercadoService: SupermercadoService, private usuarioService: UsuarioService, private loadingController: LoadingController) {
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


  ngOnInit() {
  }

  async remove(promocao: Promocao) {
    const alert = await this.alertController.create({
      header: 'Você tem certeza que quer excluir essa promoção?',
      message: promocao.nome,
      buttons: [
        {
          text: 'Cancelar'
        }, {
          text: 'Sim',
          cssClass: 'danger',
          handler: () => {
            this.promocaoService.remove(promocao.idPromocao).then(() => {
              this.loadList();
              this.showMessage('Registro excluído com sucesso!');
            }).catch(() => {
              this.showMessage('Erro ao excluir o registro:');
            });
          }
        }
      ]
    })
    await alert.present();
  }

  findName(id: number) {
    for (let supermercado of this.supermercados) {
      if (supermercado.idSupermercado === id) {
        return supermercado.nome;
      }
    }
    return;
  }

  async ionViewWillEnter() {
    this.loadList();
  }

  async loadList() {
    this.showLoader();

    await this.supermercadoService.list().then((json) => {
      this.supermercados = <Supermercado[]>(json);
    });

    await this.promocaoService.listByUsuario(this.usuarioService.recoverIdUsuario()).then((json) => {
      this.promocaos = <Promocao[]>(json);
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

  async showMessage(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    })
    toast.present();
  }
}
