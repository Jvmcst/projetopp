import { CommonModule } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonicModule, NavController, ToastController } from '@ionic/angular';
import { Supermercado } from 'src/app/model/supermercado';
import { SupermercadoService } from 'src/app/services/supermercado.service';

@Component({
  selector: 'app-criar-supermercado',
  templateUrl: './criar-supermercado.page.html',
  styleUrls: ['./criar-supermercado.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class CriarSupermercadoPage implements OnInit {
  supermercado: Supermercado;
  formGroup: FormGroup;
  darkTheme: boolean = false;

  constructor(private renderer : Renderer2, private supermercadoService: SupermercadoService, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private navController: NavController, private toastController: ToastController) {
    this.supermercado = new Supermercado();

    this.formGroup = formBuilder.group({
      'nome': [this.supermercado.nome, Validators.compose([
        Validators.required,
      ])],
      'descricao': [this.supermercado.descricao, Validators.compose([
        Validators.required,
      ])],
    });

    let idSupermercado = this.activatedRoute.snapshot.params['id'];
    if (idSupermercado != null) {
      this.supermercadoService.findByIdSupermercado(idSupermercado).then((json) => {
        this.supermercado = <Supermercado>(json);
        this.formGroup.get('nome')?.setValue(this.supermercado.nome);
        this.formGroup.get('descricao')?.setValue(this.supermercado.descricao);
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

  async save() {
    this.supermercado.nome = this.formGroup.value.nome;
    this.supermercado.descricao = this.formGroup.value.descricao;

    this.supermercadoService.saveSupermercado(this.supermercado).then((json) => {
      this.supermercado = <Supermercado>(json);
      if (this.supermercado) {
        this.showMessage('Supermercado salvo com sucesso!');
        this.navController.navigateBack('/supermercado');
      } else {
        this.showMessage('Erro ao salvar o registro!')
      }
    })
      .catch((error) => {
        this.showMessage('Erro ao salvar o registro! Erro: ' + error['mensage']);
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
