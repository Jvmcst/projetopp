import { Component, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { Categoria } from 'src/app/model/categoria';
import { Promocao } from 'src/app/model/promocao';
import { Supermercado } from 'src/app/model/supermercado';
import { CategoriaService } from 'src/app/services/categoria.service';
import { FotoService } from 'src/app/services/foto.service';
import { PromocaoService } from 'src/app/services/promocao.service';
import { SupermercadoService } from 'src/app/services/supermercado.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-criar-promocao',
  templateUrl: './criar-promocao.page.html',
  styleUrls: ['./criar-promocao.page.scss'],
})
export class CriarPromocaoPage implements OnInit {
  supermercados: Supermercado[];
  categorias: Categoria[];
  formGroup: FormGroup;
  isEnabled: boolean;
  promocao: Promocao;
  dateToday: string;
  dateExpirada: string;
  darkTheme: boolean = false;

  constructor(private alertController: AlertController, private renderer: Renderer2, private usuarioService: UsuarioService, private loadingController: LoadingController, private categoriaService: CategoriaService, private supermercadoService: SupermercadoService, private activatedRoute: ActivatedRoute, private actionSheetController: ActionSheetController, private fotoService: FotoService, private promocaoService: PromocaoService, private formBuilder: FormBuilder, private navController: NavController, private toastController: ToastController) {
    this.supermercados = [];
    this.categorias = [];
    this.dateToday = new Date().toISOString().split('T')[0];

    this.isEnabled = false;
    this.promocao = new Promocao();

    let dateAux = new Date();
    dateAux.setDate(dateAux.getDate() + 7);

    this.dateExpirada = dateAux.toISOString().split('T')[0];

    this.formGroup = formBuilder.group({
      'nome': [, Validators.compose([
        Validators.required,
      ])],
      'descricao': [, Validators.compose([
        Validators.required,
      ])],
      'valor': [, Validators.compose([
        Validators.required,
      ])],
      'idCategoria': [, Validators.compose([
        Validators.required,
      ])],
      'idSupermercado': [, Validators.compose([
        Validators.required,
      ])],
      'descricaoSupermercado': [],
      'dataInicio': [this.dateToday, Validators.compose([
        Validators.required,
      ])],
      'dataTermino': [this.dateExpirada, Validators.compose([
        Validators.required,
      ])],
      'status': ["Ativa", Validators.compose([
        Validators.required,
      ])],
      'relevancia': [0, Validators.compose([

      ])],
      'foto': [, Validators.compose([
        Validators.required,
      ])],
    }, { validators: creatDateRangeValidator() });

    let idPromocao = this.activatedRoute.snapshot.params['id'];
    if (idPromocao != null) {
      this.promocaoService.findByIdPromocao(idPromocao).then((json) => {
        this.promocao = <Promocao>(json);
        this.formGroup.get('nome')?.setValue(this.promocao.nome);
        this.formGroup.get('descricao')?.setValue(this.promocao.descricao);
        this.formGroup.get('valor')?.setValue(this.promocao.valor);
        this.formGroup.get('idCategoria')?.setValue(this.promocao.idCategoria);
        this.formGroup.get('idSupermercado')?.setValue(this.promocao.idSupermercado);
        this.formGroup.get('dataInicio')?.setValue(this.promocao.dataInicio);
        this.formGroup.get('dataTermino')?.setValue(this.promocao.dataTermino);
        this.formGroup.get('status')?.setValue(this.promocao.status);
        this.formGroup.get('relevancia')?.setValue(this.promocao.relevancia);
        this.formGroup.get('foto')?.setValue(this.promocao.foto);

        this.isEnabled = true;
      });
    }
  }

  mudarTema() {
    this.darkTheme = !this.darkTheme;
    if (this.darkTheme) {
      this.renderer.setAttribute(document.body, 'color-theme', 'dark');
    } else {
      this.renderer.setAttribute(document.body, 'color-theme', 'light');
    }
  }

  ngOnInit() { }

  async ionViewWillEnter() {
    this.loadList();
  }

  async loadList() {
    this.showLoader();

    await this.supermercadoService.list().then((json) => {
      this.supermercados = <Supermercado[]>(json);
    });

    await this.categoriaService.list().then((json) => {
      this.categorias = <Categoria[]>(json);
    });

    this.putDescricao();

    this.closeLoader();
  }

  showLoader() {
    this.loadingController.create({
      message: 'Carregando...'
    }).then((res) => {
      res.present();
    })
  }

  putDescricao() {
    let supermercado = this.supermercados.find((supermercado: Supermercado) =>
      supermercado.idSupermercado === this.formGroup.value.idSupermercado
    );

    this.formGroup.get('descricaoSupermercado')?.setValue(supermercado?.descricao);
  }

  closeLoader() {
    setTimeout(() => {
      this.loadingController.dismiss().then(() => {
      }).catch((erro) => {
        console.log('Erro: ', erro)
      });
    }, 500);
  }


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
    this.promocao.idUsuario = this.usuarioService.recoverIdUsuario();
    this.promocao.idCategoria = this.formGroup.value.idCategoria;
    this.promocao.idSupermercado = this.formGroup.value.idSupermercado;
    this.promocao.nome = this.formGroup.value.nome;
    this.promocao.valor = this.formGroup.value.valor;
    this.promocao.dataInicio = this.formGroup.value.dataInicio;
    this.promocao.dataTermino = this.formGroup.value.dataTermino;
    this.promocao.relevancia = this.formGroup.value.relevancia;
    this.promocao.descricao = this.formGroup.value.descricao;
    this.promocao.foto = this.formGroup.value.foto;
    this.promocao.status = this.formGroup.value.status;

    if (this.promocao.status === "Expirada") {
      const alert = await this.alertController.create({
        header: 'Você tem certeza que quer encerrar essa promoção?',
        message: 'Essa promoção não ficará mais visível para ninguém, inclusive você.',
        buttons: [
          {
            text: 'Cancelar',
            cssClass: 'danger'
          },
          {
            text: 'Sim, encerrar promoção',
            cssClass: 'amarelo',
            handler: () => {
              this.promocaoService.savePromocao(this.promocao).then((json) => {
                this.promocao = <Promocao>(json);
                if (this.promocao) {
                  this.showMessage('Promoção registrada com sucesso!');
                  this.navController.navigateBack('/home');
                } else {
                  this.showMessage('Erro ao salvar o registro!')
                }
              })
                .catch((error) => {
                  this.showMessage('Erro ao salvar o registro! Erro: ' + error['mensage']);
                });
            }
          }
        ]
      })
      await alert.present();
    } else {
      this.promocaoService.savePromocao(this.promocao).then((json) => {
        this.promocao = <Promocao>(json);
        if (this.promocao) {
          this.showMessage('Promoção registrada com sucesso!');
          this.navController.navigateBack('/home');
        } else {
          this.showMessage('Erro ao salvar o registro!')
        }
      })
        .catch((error) => {
          this.showMessage('Erro ao salvar o registro! Erro: ' + error['mensage']);
        });
    }
    this.promocao.foto = this.formGroup.value.foto;
  }

  async showMessage(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present();
  }
}


export function creatDateRangeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const start = control.get('dataInicio')?.value;
    const end = control.get('dataTermino')?.value;

    let dataInicio: Date = new Date();

    let dataParts = start.split("-");
    dataInicio.setDate(dataParts[2]);
    dataInicio.setMonth(dataParts[1] - 1);
    dataInicio.setFullYear(dataParts[0]);

    let dataTermino: Date = new Date();

    dataParts = end.split("-");
    dataTermino.setDate(dataParts[2]);
    dataTermino.setMonth(dataParts[1] - 1);
    dataTermino.setFullYear(dataParts[0]);

    if (dataInicio && dataTermino) {
      const isRangeValid = (dataTermino.getTime() - dataInicio.getTime() >= 0);

      return isRangeValid ? null : { dateRange: true };
    }

    return null;
  };
}
