import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'criar-conta',
    loadChildren: () => import('./pages/criar-conta/criar-conta.module').then( m => m.CriarContaPageModule)
  },
  {
    path: 'detalhes-promocao',
    loadChildren: () => import('./pages/detalhes-promocao/detalhes-promocao.module').then( m => m.DetalhesPromocaoPageModule)
  },
  {
    path: 'detalhes-promocao/:id',
    loadChildren: () => import('./pages/detalhes-promocao/detalhes-promocao.module').then( m => m.DetalhesPromocaoPageModule)
  },
  {
    path: 'pesquisar',
    loadChildren: () => import('./pages/pesquisar/pesquisar.module').then( m => m.PesquisarPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'perfil/:id',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'meus-dados',
    loadChildren: () => import('./pages/meus-dados/meus-dados.module').then( m => m.MeusDadosPageModule)
  },
  {
    path: 'meus-dados/:idUsuario',
    loadChildren: () => import('./pages/meus-dados/meus-dados.module').then( m => m.MeusDadosPageModule)
  },
  {
    path: 'minhas-promocoes',
    loadChildren: () => import('./pages/minhas-promocoes/minhas-promocoes.module').then( m => m.MinhasPromocoesPageModule)
  },
  {
    path: 'minhas-promocoes/:id',
    loadChildren: () => import('./pages/minhas-promocoes/minhas-promocoes.module').then( m => m.MinhasPromocoesPageModule)
  },
  {
    path: 'meus-salvos',
    loadChildren: () => import('./pages/meus-salvos/meus-salvos.module').then( m => m.MeusSalvosPageModule)
  },
  {
    path: 'meus-salvos/:id',
    loadChildren: () => import('./pages/meus-salvos/meus-salvos.module').then( m => m.MeusSalvosPageModule)
  },
  {
    path: 'sair',
    loadChildren: () => import('./pages/sair/sair.module').then( m => m.SairPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'criar-promocao',
    loadChildren: () => import('./pages/criar-promocao/criar-promocao.module').then( m => m.CriarPromocaoPageModule)
  },
  {
    path: 'criar-promocao/:id',
    loadChildren: () => import('./pages/criar-promocao/criar-promocao.module').then( m => m.CriarPromocaoPageModule)
  },
  {
    path: 'supermercado',
    loadChildren: () => import('./pages/supermercado/supermercado.module').then( m => m.SupermercadoPageModule)
  },
  {
    path: 'categoria',
    loadChildren: () => import('./pages/categoria/categoria.module').then( m => m.CategoriaPageModule)
  },
  {
    path: 'criar-categoria',
    loadChildren: () => import('./pages/criar-categoria/criar-categoria.module').then( m => m.CriarCategoriaPageModule)
  },
  {
    path: 'criar-categoria/:id',
    loadChildren: () => import('./pages/criar-categoria/criar-categoria.module').then( m => m.CriarCategoriaPageModule)
  },
  {
    path: 'criar-supermercado',
    loadChildren: () => import('./pages/criar-supermercado/criar-supermercado.module').then( m => m.CriarSupermercadoPageModule)
  },
  {
    path: 'criar-supermercado/:id',
    loadChildren: () => import('./pages/criar-supermercado/criar-supermercado.module').then( m => m.CriarSupermercadoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
