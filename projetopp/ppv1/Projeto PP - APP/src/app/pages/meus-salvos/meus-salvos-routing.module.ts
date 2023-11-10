import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeusSalvosPage } from './meus-salvos.page';

const routes: Routes = [
  {
    path: '',
    component: MeusSalvosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeusSalvosPageRoutingModule {}
