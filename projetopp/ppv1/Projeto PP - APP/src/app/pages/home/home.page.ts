import { Component, OnInit, Renderer2 } from '@angular/core';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { Promocao } from 'src/app/model/promocao';
import { Supermercado } from 'src/app/model/supermercado';
import { PromocaoService } from 'src/app/services/promocao.service';
import { SupermercadoService } from 'src/app/services/supermercado.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public alertButtons = ['Vamos nessa!!!'];
  promocaos: Promocao[];
  supermercados: Supermercado[];
  darkTheme: boolean = false;

  constructor(private renderer: Renderer2, private supermercadoService: SupermercadoService, private alertController: AlertController, private usuarioService: UsuarioService, private navController: NavController, private promocaoService: PromocaoService, private toastController: ToastController, private loadingController: LoadingController) {
    this.promocaos = [];
    this.supermercados = [];
  }

  mudarTema() {
    this.darkTheme = !this.darkTheme;
    if (this.darkTheme) {
      this.renderer.setAttribute(document.body, 'color-theme', 'dark');
    } else {
      this.renderer.setAttribute(document.body, 'color-theme', 'light');
    }
  }

  async redirectToCriarPromocao() {
    if (!this.usuarioService.isSession()) {
      this.showAviso();
    } else {
      this.navController.navigateRoot('criar-promocao');
    }
  }

  async redirectToPerfil() {
    if (!this.usuarioService.isSession()) {
      this.showAviso();
    } else {
      this.navController.navigateRoot('perfil');
    }
  }

  private async showAviso() {
    const alert = await this.alertController.create({
      header: 'Você precisa estar logado para ter acesso a essa funcionalidade.',
      message: 'Para cadastrar, salvar e avaliar promoções, faça login ou crie uma conta.',
      buttons: [
        {
          text: 'Cancelar',
          cssClass: 'danger'
        }, {
          text: 'Fazer login',
          cssClass: 'laranja',
          handler: () => {
            this.navController.navigateBack('/login');
          }
        },
        {
          text: 'Criar conta',
          cssClass: 'amarelo',
          handler: () => {
            this.navController.navigateBack('/criar-conta');
          }
        }
      ]
    })
    await alert.present();
  }

  ngOnInit() {
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
    })

    await this.promocaoService.listToday().then((json) => {
      this.promocaos = <Promocao[]>(json);

      if (this.promocaos.length === 0) {
        this.showMessage("Não há promoções cadastradas no dia de hoje.");
      }
    })

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

  async showMessage(text: string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 1500
    })
    toast.present();
  }
}
