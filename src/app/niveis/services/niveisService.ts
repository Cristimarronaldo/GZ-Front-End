import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { BaseService } from 'src/app/services/base.service';
import { NiveisDTO } from "../models/niveisDTO";

@Injectable()
export class NiveisService extends BaseService {

    niveis: NiveisDTO = new NiveisDTO();

    constructor(private http: HttpClient) { super() }

    obterTodos(): Observable<NiveisDTO[]> {
        return this.http
            .get<NiveisDTO[]>( this.UrlServiceV1 +"niveis")
            .pipe(catchError(super.serviceError));
    }

    obterPorId(id: string): Observable<NiveisDTO> {
        return this.http
            .get<NiveisDTO>(this.UrlServiceV1 + "niveis/" + id, super.ObterHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    novoNiveis(niveis: NiveisDTO): Observable<NiveisDTO> {
        return this.http
            .post(this.UrlServiceV1 + "niveis", niveis, this.ObterHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    atualizarNiveis(niveis: NiveisDTO): Observable<NiveisDTO> {
        return this.http
            .put(this.UrlServiceV1 + "niveis/" + niveis.id, niveis, super.ObterHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    excluirNiveis(id: number): Observable<NiveisDTO> {
        return this.http
            .delete(this.UrlServiceV1 + "niveis/" + id, super.ObterHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

}
