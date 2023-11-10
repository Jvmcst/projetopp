import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalhesPromocaoPageRoutingModule } from './detalhes-promocao-routing.module';

import { DetalhesPromocaoPage } from './detalhes-promocao.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalhesPromocaoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DetalhesPromocaoPage]
})
export class DetalhesPromocaoPageModule {}
