import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CriarPromocaoPage } from './criar-promocao.page';

const routes: Routes = [
  {
    path: '',
    component: CriarPromocaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CriarPromocaoPageRoutingModule {}
