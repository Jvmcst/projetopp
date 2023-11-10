import { Component, OnInit, Renderer2} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionSheetController, AlertController, NavController, ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';
import { FotoService } from 'src/app/services/foto.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-meus-dados',
  templateUrl: './meus-dados.page.html',
  styleUrls: ['./meus-dados.page.scss'],
})
export class MeusDadosPage implements OnInit {
  usuario: Usuario;
  formGroup: FormGroup;
  darkTheme: boolean = false;

  constructor(private renderer : Renderer2, private actionSheetController: ActionSheetController, private fotoService: FotoService, private usuarioService: UsuarioService, private formBuilder: FormBuilder, private navController: NavController, private toastController: ToastController, private alertController: AlertController) {
    this.usuario = new Usuario();

    this.formGroup = formBuilder.group({
      'nome': [, Validators.compose([
        Validators.required,
      ])],
      'foto': [, Validators.compose([])],
      'email': [, Validators.compose([
        Validators.email,
        Validators.required,
      ])],
      'senha': [, Validators.compose([
        Validators.required,
        Validators.minLength(8),
      ])],
      'telefone': [, Validators.compose([
        Validators.required,
        Validators.maxLength(11),
        Validators.minLength(11)
      ])],
    });

    if ((!Number.isNaN(this.usuarioService.recoverIdUsuario()) && this.usuarioService.recoverIdUsuario() !== 0)) {
      this.usuarioService.findByIdUsuario(this.usuarioService.recoverIdUsuario()).then((json) => {
        this.usuario = <Usuario>(json);

        this.formGroup.get('nome')?.setValue(this.usuario.nome);
        this.formGroup.get('email')?.setValue(this.usuario.email);
        this.formGroup.get('foto')?.setValue(this.usuario.foto);
        this.formGroup.get('senha')?.setValue(this.usuario.senha);
        this.formGroup.get('telefone')?.setValue(this.usuario.telefone);
      });
    }
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

  ngOnInit() { }

  async takePhoto() {
    await this.fotoService.register();
  }

  async removeFoto() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Fotos',
      buttons: [{
        text: 'Excluir',
        icon: 'trash',
        handler: () => {
          this.fotoService.remove();
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
      }]
    });
    await actionSheet.present();
  }

  async save() {
    this.usuario.nome = this.formGroup.value.nome;
    this.usuario.email = this.formGroup.value.email;
    this.usuario.senha = this.formGroup.value.senha;
    this.usuario.telefone = this.formGroup.value.telefone;
    //this.usuario.foto = this.formGroup.value.foto;
    this.usuario.foto = "Ainda sem fotos!";

    this.usuarioService.saveUsuario(this.usuario).then((json) => {
      this.usuario = <Usuario>(json);
      if (this.usuario) {
        this.showMessage('Usuário registrado com sucesso!');
        this.navController.navigateBack('/home');
      } else {
        this.showMessage('Erro ao salvar a conta!')
      }
    })
      .catch((error) => {
        this.showMessage('Erro ao salvar a conta! Erro: ' + error['mensage']);
      });
  }

  async showMessage(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present();
  }

  async remove() {
    const alert = await this.alertController.create({
      header: 'Você tem certeza que quer excluir sua conta?',
      message: "Todas as promoções que você criou serão excluídas!",
      buttons: [
        {
          text: 'Cancelar'
        }, {
          text: 'Sim',
          cssClass: 'danger',
          handler: () => {

            this.usuarioService.checkDev(this.usuario.email).then((json) => {
              if (<boolean>(json)) {
                this.showMessage('Desenvolvedores não podem excluir a sua conta!');
              } else {
                this.usuarioService.remove(this.usuario.idUsuario).then(() => {
                  this.navController.navigateBack('/sair');
                }).catch(() => {
                  this.showMessage('Erro ao excluir conta!');
                });
              }
            });
          }
        }
      ]
    })
    await alert.present();
  }
}
