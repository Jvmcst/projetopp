import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CriarSupermercadoPageRoutingModule } from './criar-supermercado-routing.module';

import { CriarSupermercadoPage } from './criar-supermercado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CriarSupermercadoPageRoutingModule,
    CriarSupermercadoPage
  ],
  declarations: []
})
export class CriarSupermercadoPageModule {}
