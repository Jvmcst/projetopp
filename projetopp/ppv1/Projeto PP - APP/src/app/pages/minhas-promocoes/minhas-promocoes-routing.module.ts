import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MinhasPromocoesPage } from './minhas-promocoes.page';

const routes: Routes = [
  {
    path: '',
    component: MinhasPromocoesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MinhasPromocoesPageRoutingModule {}
