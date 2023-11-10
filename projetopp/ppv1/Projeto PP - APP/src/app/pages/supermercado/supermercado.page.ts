import { CommonModule } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AlertController, IonicModule, LoadingController, ToastController } from '@ionic/angular';
import { Supermercado } from 'src/app/model/supermercado';
import { SupermercadoService } from 'src/app/services/supermercado.service';

@Component({
  selector: 'app-supermercado',
  templateUrl: './supermercado.page.html',
  styleUrls: ['./supermercado.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class SupermercadoPage implements OnInit {
  supermercados: Supermercado[];
  darkTheme: boolean = false;

  constructor(private renderer : Renderer2, private supermercadoService: SupermercadoService, private toastController: ToastController, private alertController: AlertController, private loadingController: LoadingController) {
    this.supermercados = [];
  }

  mudarTema(){
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

  async ionViewWillEnter() {
    this.loadList();
  }

  async loadList() {
    this.showLoader();

    await this.supermercadoService.list()
      .then((json) => {
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

  async showMessage(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    })
    toast.present();
  }

  async remove(supermercado: Supermercado) {
    const alert = await this.alertController.create({
      header: 'Você tem certeza que quer excluir esse supermercado?',
      message: supermercado.nome,
      buttons: [
        {
          text: 'Cancelar'
        }, {
          text: 'Sim',
          cssClass: 'danger',
          handler: () => {
            this.supermercadoService.remove(supermercado.idSupermercado).then(() => {
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
}
