import { Component, OnInit } from '@angular/core';
import { NiveisDTO } from '../models/niveisDTO';
import { NiveisService } from '../services/niveisService';

@Component({
  selector: 'app-lista-niveis',
  templateUrl: './lista-niveis.component.html'
})
export class ListaNiveisComponent implements OnInit {

  public niveis: NiveisDTO[];
  errorMessage: string;

  constructor(private niveisService: NiveisService) { }

  ngOnInit(): void {
    this.niveisService.obterTodos()
      .subscribe({
        next: (listaNiveis: any) => {this.niveis = listaNiveis
        },
        error: (errorMensagem) => { this.errorMessage = errorMensagem }
      });
  }

}
