import { DesenvolvedorGuard } from './services/desenvolvedor.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, Resolve, CanDeactivate } from '@angular/router';

import { ExcluirComponent } from './excluir/excluir.component';
import { NovoComponent } from './novo/novo.component';
import { ListaDesenvolvedorComponent } from './lista-desenvolvedor/lista-desenvolvedor.component';
import { DesenvolvedorAppComponent } from './desenvolvedor.app.component';
import { DesenvolvedorResolve } from './services/desenvolvedor.Resolve';
import { EditarComponent } from './editar/editar.component';



const desenvolvedorRouterConfig: Routes = [
   {
      path: '', component: DesenvolvedorAppComponent,
      children: [
        {path: 'listadesenvolvedor', component: ListaDesenvolvedorComponent},
        {
          path: 'novo', component: NovoComponent,
          canDeactivate: [DesenvolvedorGuard]
        },
        {
          path: 'editar/:id', component: EditarComponent,
          resolve: { desenvolvedores: DesenvolvedorResolve }
        },
        {
          path: 'excluir/:id', component: ExcluirComponent,
           resolve: {desenvolvedores: DesenvolvedorResolve }
        }
      ]
   }
]

@NgModule({
  imports:[
    RouterModule.forChild(desenvolvedorRouterConfig)
  ],
  exports: [RouterModule]
})
export class DesenvolvedorRouterModule{}
