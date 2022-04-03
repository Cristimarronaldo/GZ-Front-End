import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { DesenvolvedorDTO } from '../models/DesenvolvedorDTO';
import { DesenvolvedorService } from './desenvolvedorService';



@Injectable()
export class DesenvolvedorResolve implements Resolve<DesenvolvedorDTO> {

    constructor(private desenvolvedorService: DesenvolvedorService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.desenvolvedorService.obterPorId(route.params['id']);
    }
}
