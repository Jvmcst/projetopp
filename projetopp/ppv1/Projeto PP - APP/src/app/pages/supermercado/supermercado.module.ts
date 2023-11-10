import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SupermercadoPageRoutingModule } from './supermercado-routing.module';

import { SupermercadoPage } from './supermercado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SupermercadoPageRoutingModule,
    SupermercadoPage
  ],
  declarations: []
})
export class SupermercadoPageModule {}
