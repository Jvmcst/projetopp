import { CommonModule } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, NavController, ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {
  public alertButtons = ['Vamos nessa!!!'];

  formGroup: FormGroup;
  darkTheme = false;

  constructor(private renderer : Renderer2, private usuarioService: UsuarioService, private formBuilder: FormBuilder, private navController: NavController, private toastController: ToastController) {
    if (this.usuarioService.isSession()) {
      this.showMessage("Bem vindo de volta.! ;)");
      this.navController.navigateBack('/home');
    }
    
    this.formGroup = formBuilder.group({
      'email': [, Validators.compose([
        Validators.email,
        Validators.required,
      ])],
      'senha': [, Validators.compose([
        Validators.required,
      ])],
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

  redirectToHome() {
    this.navController.navigateRoot('home');
  }

  redirectToCriarConta() {
    this.navController.navigateRoot('criar-conta');
  }

  ngOnInit() { }

  async login() {
    await this.usuarioService.login(this.formGroup.value.email, this.formGroup.value.senha).then((json) => {
      let usuario = <Usuario>(json);

      if (<Usuario>(json) === null) {
        this.showMessage('Usuário não encontrado.');
      } else {
        this.showMessage('Bem vindo ao sistema!');
        this.usuarioService.saveIdUsuario(usuario.idUsuario);
        this.navController.navigateBack('/home')
      }
    });
  }

  async showMessage(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present();
  }
}
