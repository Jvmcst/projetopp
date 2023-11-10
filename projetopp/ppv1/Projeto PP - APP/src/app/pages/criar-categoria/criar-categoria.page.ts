import { CommonModule } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonicModule, NavController, ToastController } from '@ionic/angular';
import { Categoria } from 'src/app/model/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-criar-categoria',
  templateUrl: './criar-categoria.page.html',
  styleUrls: ['./criar-categoria.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})

export class CriarCategoriaPage implements OnInit {
  categoria: Categoria;
  formGroup: FormGroup;
  darkTheme: boolean = false;

  constructor(private renderer : Renderer2, private categoriaService: CategoriaService, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private navController: NavController, private toastController: ToastController) {

    this.categoria = new Categoria();

    this.formGroup = formBuilder.group({
      'nome': [this.categoria.nome, Validators.compose([
        Validators.required,
      ])],
    });

    let idCategoria = this.activatedRoute.snapshot.params['id'];
    if (idCategoria != null) {
      this.categoriaService.findByIdCategoria(idCategoria).then((json) => {
        this.categoria = <Categoria>(json);
        this.formGroup.get('nome')?.setValue(this.categoria.nome);
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
    this.categoria.nome = this.formGroup.value.nome;

    this.categoriaService.saveCategoria(this.categoria).then((json) => {
      this.categoria = <Categoria>(json);
      if (this.categoria) {
        this.showMessage('Categoria salva com sucesso!');
        this.navController.navigateBack('/categoria');
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