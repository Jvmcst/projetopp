import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CriarCategoriaPage } from './criar-categoria.page';

const routes: Routes = [
  {
    path: '',
    component: CriarCategoriaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CriarCategoriaPageRoutingModule {}
