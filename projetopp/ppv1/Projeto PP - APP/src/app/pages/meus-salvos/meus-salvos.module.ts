import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeusSalvosPageRoutingModule } from './meus-salvos-routing.module';

import { MeusSalvosPage } from './meus-salvos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeusSalvosPageRoutingModule
  ],
  declarations: [MeusSalvosPage]
})
export class MeusSalvosPageModule {}
