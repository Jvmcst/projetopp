import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeusDadosPageRoutingModule } from './meus-dados-routing.module';

import { MeusDadosPage } from './meus-dados.page';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    MeusDadosPageRoutingModule,
    NgxMaskModule.forChild()
  ],
  declarations: [MeusDadosPage]
})
export class MeusDadosPageModule {}
