import { Component, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActionSheetController, NavController, ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';
import { FotoService } from 'src/app/services/foto.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.page.html',
  styleUrls: ['./criar-conta.page.scss'],
})
export class CriarContaPage implements OnInit {
  formGroup: FormGroup;
  darkTheme: boolean = false;
  selectedImage: any;

  constructor(private renderer: Renderer2, private actionSheetController: ActionSheetController, private fotoService: FotoService, private usuarioService: UsuarioService, private formBuilder: FormBuilder, private navController: NavController, private toastController: ToastController) {

    this.formGroup = this.formBuilder.group({
      'nome': [, Validators.compose([
        Validators.required,
      ])],
      'foto': [, Validators.compose([])],
      'email': [, Validators.compose([
        Validators.email,
        Validators.required,
      ])],
      'senha': ['', Validators.compose([
        Validators.required,
        Validators.minLength(4),
      ])],
      'senha2': ['', Validators.compose([
        Validators.required,
        Validators.minLength(4),
      ])],
      'telefone': [, Validators.compose([
        Validators.required,
        Validators.maxLength(11),
        Validators.minLength(11)
      ])],
    }, { validators: this.senha2IgualSenha });

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

  async takePhoto() {
    this.fotoService.register().then(() => {

      let img = document.querySelector("#image");
      img!.setAttribute('src', this.fotoService.foto.webPath!);
    })
      .catch((error): any => {
        console.log(error);
      });
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
    this.usuarioService.checkEmail(this.formGroup.value.email).then((json) => {
      if (<Boolean>(json)) {
        this.showMessage("Email já cadastrado!");
      } else {

        let nomeImagem: string;

        if (this.fotoService.foto === undefined) {
          nomeImagem = "usuario.png";
        } else {
          nomeImagem = new Date().getTime() + "." + this.fotoService.foto.format;
          this.fotoService.upload(this.fotoService.foto, nomeImagem).then();
        }

        let usuario = new Usuario();

        usuario.nome = this.formGroup.value.nome;
        usuario.email = this.formGroup.value.email;
        usuario.senha = this.formGroup.value.senha;
        usuario.telefone = this.formGroup.value.telefone;
        usuario.foto = "http://localhost/img/" + nomeImagem;

        this.usuarioService.saveUsuario(usuario).then((json) => {
          usuario = <Usuario>(json);
          if (usuario) {
            this.showMessage('Usuário registrado com sucesso!');
            this.navController.navigateBack('/home');
            this.usuarioService.saveIdUsuario(usuario.idUsuario);
          } else {
            this.showMessage('Erro ao salvar o registro!')
          }
        })
          .catch((error) => {
            this.showMessage('Erro ao salvar o registro! Erro: ' + error['mensage']);
          });
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

  async openGallery() {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }

    this.fotoService.register();
  }

  previewImage(event: any) {
    const file = event.target?.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          this.selectedImage = e.target.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  senha2IgualSenha(formGroup: FormGroup) {
    const senha2 = formGroup.get('senha2')?.value;
    const senha = formGroup.get('senha')?.value;

    // Verifica se as senhas são iguais
    if (senha !== senha2) {
      formGroup.get('senha2')?.setErrors({ senhasDiferentes: true });

    } else {
      formGroup.get('senha2')?.setErrors(null);
    }
  }

}





// export function verify(): ValidatorFn {
//   return (control:AbstractControl) : ValidationErrors | null => {

//       const value = control.value;

//       if (!value) {
//           return null;
//       }

//       const passwordValid = false;

//       return !passwordValid ? {passwordStrength:true}: null;
//   }
// }


// export function verify(): ValidatorFn {
//   return (control:AbstractControl) : ValidationErrors | null => {

//       const value = control.value;

//       if (!value) {
//           return null;
//       }

//       const passwordValid = false;

//       return !passwordValid ? {passwordStrength:true}: null;
//   }
// }