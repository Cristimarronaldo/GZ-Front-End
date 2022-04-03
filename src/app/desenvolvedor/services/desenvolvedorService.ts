import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { BaseService } from 'src/app/services/base.service';
import { DesenvolvedorDTO, Niveis } from "../models/DesenvolvedorDTO";



@Injectable()
export class DesenvolvedorService extends BaseService {

  desenvolvedor: DesenvolvedorDTO = new DesenvolvedorDTO();

    constructor(private http: HttpClient) { super() }

    obterTodos(): Observable<DesenvolvedorDTO[]> {
        return this.http
            .get<DesenvolvedorDTO[]>( this.UrlServiceV1 + "desenvolvedor")
            .pipe(catchError(super.serviceError));
    }

    obterPorId(id: string): Observable<DesenvolvedorDTO> {
        return this.http
            .get<DesenvolvedorDTO>(this.UrlServiceV1 + "desenvolvedor/" + id, super.ObterHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    novoDesenvolvedor(desenvolvedor: DesenvolvedorDTO): Observable<DesenvolvedorDTO> {
        return this.http
            .post(this.UrlServiceV1 + "desenvolvedor", desenvolvedor, this.ObterHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    atualizarDesenvolvedor(desenvolvedor: DesenvolvedorDTO): Observable<DesenvolvedorDTO> {
        return this.http
            .put(this.UrlServiceV1 + "desenvolvedor/" + desenvolvedor.id, desenvolvedor, super.ObterHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    excluirDesenvolvedor(id: number): Observable<DesenvolvedorDTO> {
        return this.http
            .delete(this.UrlServiceV1 + "desenvolvedor/" + id, super.ObterHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    obterTodosNiveis(): Observable<Niveis[]> {
      return this.http
          .get<Niveis[]>(this.UrlServiceV1 + "niveis")
          .pipe(catchError(super.serviceError));
  }

}
