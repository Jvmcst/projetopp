import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CriarPromocaoPageRoutingModule } from './criar-promocao-routing.module';

import { CriarPromocaoPage } from './criar-promocao.page';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CriarPromocaoPageRoutingModule,
    ReactiveFormsModule,
    NgxMaskModule.forChild()
  ],
  declarations: [CriarPromocaoPage]
})
export class CriarPromocaoPageModule {}
