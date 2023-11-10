import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CriarCategoriaPageRoutingModule } from './criar-categoria-routing.module';

import { CriarCategoriaPage } from './criar-categoria.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CriarCategoriaPageRoutingModule,
    ReactiveFormsModule,
    CriarCategoriaPage
  ],
  declarations: []
})
export class CriarCategoriaPageModule {}
