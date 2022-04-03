import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './navegacao/not-found/not-found.component';
import { HomeComponent } from './navegacao/home/home.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {
     path: 'niveis',
     loadChildren: () => import('./niveis/niveis.module').then(m => m.NiveisModule)
  },
  {
    path: 'desenvolvedor',
    loadChildren: () => import('./desenvolvedor/desenvolvedor.module').then(m => m.DesenvolvedorModule)
  },
  {path: 'nao-encontrado', component: NotFoundComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
