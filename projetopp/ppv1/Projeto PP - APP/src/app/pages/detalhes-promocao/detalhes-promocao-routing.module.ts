import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalhesPromocaoPage } from './detalhes-promocao.page';

const routes: Routes = [
  {
    path: '',
    component: DetalhesPromocaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalhesPromocaoPageRoutingModule {}
