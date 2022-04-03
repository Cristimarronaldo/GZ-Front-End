import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NiveisAppComponent } from './niveis.app.component';
import { NiveisRouterModule } from './niveis.route';
import { ListaNiveisComponent } from './lista-niveis/lista-niveis.component';
import { NiveisService } from './services/niveisService';
import { EditarComponent } from './editar/editar.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { NovoComponent } from './novo/novo.component';
import { NiveisResolve } from './services/niveis.resolve';
import { NiveisGuard } from './services/niveis.guard';



@NgModule({
  declarations: [
    NiveisAppComponent,
    ListaNiveisComponent,
    EditarComponent,
    ExcluirComponent,
    NovoComponent
  ],
  imports: [
    CommonModule,
    NiveisRouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    NiveisService,
    NiveisResolve,
    NiveisGuard
  ],
  exports: []
})
export class NiveisModule { }
