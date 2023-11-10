import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PesquisarPage } from './pesquisar.page';

const routes: Routes = [
  {
    path: '',
    component: PesquisarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PesquisarPageRoutingModule {}
