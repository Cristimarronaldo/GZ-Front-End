import { DesenvolvedorService } from './../services/desenvolvedorService';
import { Component, OnInit } from '@angular/core';
import { DesenvolvedorDTO } from '../models/DesenvolvedorDTO';

@Component({
  selector: 'app-lista-desenvolvedor',
  templateUrl: './lista-desenvolvedor.component.html'
})
export class ListaDesenvolvedorComponent implements OnInit {

  public desenvolvedores: DesenvolvedorDTO[];
  errorMessage: string;

  constructor(private desenvolvedorService: DesenvolvedorService) { }

  ngOnInit(): void {
    this.desenvolvedorService.obterTodos()
      .subscribe({
        next: (listaDesenvolvedor: any) => {this.desenvolvedores = listaDesenvolvedor },
        error: (errorMensagem) => { this.errorMessage = errorMensagem }
      });
  }

}
