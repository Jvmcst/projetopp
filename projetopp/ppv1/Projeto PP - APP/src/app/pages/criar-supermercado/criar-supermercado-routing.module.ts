import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CriarSupermercadoPage } from './criar-supermercado.page';

const routes: Routes = [
  {
    path: '',
    component: CriarSupermercadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CriarSupermercadoPageRoutingModule {}
