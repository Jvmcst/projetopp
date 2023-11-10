import { Component, OnInit, Renderer2 } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  isDev: boolean;
  darkTheme: boolean = false;

  public appPages = [
    { title: 'Meus dados', url: '/meus-dados', icon: 'cog', color: 'yellow-light' },
    { title: 'Minhas promoções', url: '/minhas-promocoes', icon: 'cart-outline', color: 'salmon' },
    { title: 'Meus favoritos', url: '/meus-salvos', icon: 'bookmark', color: 'danger' },
    { title: 'Sair', url: '/sair', icon: 'power', color: 'intense-red' },
  ];

  public appDevPages = [
    { title: 'Supermercados', url: '/supermercado', icon: 'bug', color: 'intense-red' },
    { title: 'Categorias', url: '/categoria', icon: 'apps', color: 'intense-red' },
  ];

  constructor(private renderer : Renderer2, private toastController: ToastController, private navController: NavController, private usuarioService: UsuarioService) {
    this.isDev = false;

    this.usuarioService.findByIdUsuario(this.usuarioService.recoverIdUsuario()).then((json) => {
      let usuario = <Usuario>(json);

      this.usuarioService.checkDev(usuario.email).then((json) => {
        this.isDev = <boolean>(json);
      });
    });
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

  async showMessage(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    })
    toast.present();
  }
}