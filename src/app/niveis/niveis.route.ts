import { NiveisResolve } from './services/niveis.resolve';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExcluirComponent } from './excluir/excluir.component';
import { EditarComponent } from './editar/editar.component';
import { NovoComponent } from './novo/novo.component';
import { ListaNiveisComponent } from './lista-niveis/lista-niveis.component';
import { NiveisAppComponent } from './niveis.app.component';
import { NiveisGuard } from './services/niveis.guard';

const niveisRouterConfig: Routes = [
   {
      path: '', component: NiveisAppComponent,
      children: [
         {path: 'listaniveis', component: ListaNiveisComponent},
         {
            path: 'novo', component: NovoComponent,
            canDeactivate: [NiveisGuard]
         },
         {
           path: 'editar/:id', component: EditarComponent,
           resolve: { niveis: NiveisResolve}
         },
         {
           path: 'excluir/:id', component: ExcluirComponent,
           resolve: {niveis: NiveisResolve}
        }
      ]
   }
]

@NgModule({
  imports:[
    RouterModule.forChild(niveisRouterConfig)
  ],
  exports: [RouterModule]
})
export class NiveisRouterModule{}
