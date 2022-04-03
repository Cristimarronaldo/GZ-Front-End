import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { DesenvolvedorAppComponent } from './desenvolvedor.app.component';
import { DesenvolvedorRouterModule } from './desenvolvedor.route';
import { ListaDesenvolvedorComponent } from './lista-desenvolvedor/lista-desenvolvedor.component';
import { NovoComponent } from './novo/novo.component';
import { DesenvolvedorService } from './services/desenvolvedorService';
import { EditarComponent } from './editar/editar.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { DesenvolvedorResolve } from './services/desenvolvedor.Resolve';
import { DesenvolvedorGuard } from './services/desenvolvedor.guard';


@NgModule({
  declarations: [
    DesenvolvedorAppComponent,
    ListaDesenvolvedorComponent,
    NovoComponent,
    EditarComponent,
    ExcluirComponent
  ],
  imports: [
    CommonModule,
    DesenvolvedorRouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    DesenvolvedorService,
    DesenvolvedorResolve,
    DesenvolvedorGuard
  ]
})
export class DesenvolvedorModule { }
