import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { NiveisDTO } from '../models/niveisDTO';
import { NiveisService } from './niveisService';

@Injectable()
export class NiveisResolve implements Resolve<NiveisDTO> {

    constructor(private niveisService: NiveisService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.niveisService.obterPorId(route.params['id']);
    }
}
