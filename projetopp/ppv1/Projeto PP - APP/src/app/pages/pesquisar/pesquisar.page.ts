import { CommonModule } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, IonicModule, LoadingController, NavController, ToastController } from '@ionic/angular';
import { Categoria } from 'src/app/model/categoria';
import { Promocao } from 'src/app/model/promocao';
import { Supermercado } from 'src/app/model/supermercado';
import { CategoriaService } from 'src/app/services/categoria.service';
import { FotoService } from 'src/app/services/foto.service';
import { PromocaoService } from 'src/app/services/promocao.service';
import { SupermercadoService } from 'src/app/services/supermercado.service';

@Component({
  selector: 'app-pesquisar',
  templateUrl: './pesquisar.page.html',
  styleUrls: ['./pesquisar.page.scss'],
})

export class PesquisarPage implements OnInit {
  formGroup: FormGroup;
  supermercados: Supermercado[];
  categorias: Categoria[];
  promocaos: Promocao[];
  darkTheme: boolean = false;

  constructor(private renderer: Renderer2, private loadingController: LoadingController, private categoriaService: CategoriaService, private supermercadoService: SupermercadoService, private activatedRoute: ActivatedRoute, private actionSheetController: ActionSheetController, private fotoService: FotoService, private promocaoService: PromocaoService, private formBuilder: FormBuilder, private navController: NavController, private toastController: ToastController) {
    this.supermercados = [];
    this.categorias = [];
    this.promocaos = [];

    this.formGroup = formBuilder.group({
      'categoria': [, Validators.compose([
      ])],
      'supermercado': [, Validators.compose([
      ])],
      'searchField': [, Validators.compose([
      ])],
    });
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

  ngOnInit() { }

  async ionViewWillEnter() {
    this.loadList();
  }

  async loadList() {
    this.showLoader();

    await this.supermercadoService.list()
      .then((json) => {
        this.supermercados = <Supermercado[]>(json);
      });

    await this.categoriaService.list()
      .then((json) => {
        this.categorias = <Categoria[]>(json);
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

  findName(id: number) {
    for (let supermercado of this.supermercados) {
      if (supermercado.idSupermercado === id) {
        return supermercado.nome;
      }
    }
    return;
  }

  async find() {
    let categoria = this.formGroup.value.categoria;
    let supermercado = this.formGroup.value.supermercado;
    let searchField = this.formGroup.value.searchField;

    if (categoria === null) {
      categoria = 0;
    }

    if (supermercado === null) {
      supermercado = 0;
    }

    if (!(searchField === null)) {
      searchField.trim();
      
      if (searchField === "") {
        searchField = "-";
      }

    } else {
      searchField = "-";
    }

    this.promocaoService.search(categoria, supermercado, searchField).then((json) => {
      this.promocaos = <Promocao[]>(json);

      if (this.promocaos.length === 0) {
        this.showMessage("Nenhum resultado encontrado.");
      }
    });

    this.loadList();
  }

  async showMessage(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 2500
    });
    toast.present();
  }
}