import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MinhasPromocoesPageRoutingModule } from './minhas-promocoes-routing.module';

import { MinhasPromocoesPage } from './minhas-promocoes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MinhasPromocoesPageRoutingModule
  ],
  declarations: [MinhasPromocoesPage]
})
export class MinhasPromocoesPageModule {}
