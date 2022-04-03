import { Injectable } from '@angular/core';
import { CanDeactivate, Router } from '@angular/router';

import { NovoComponent } from '../novo/novo.component';

@Injectable()
export class DesenvolvedorGuard implements CanDeactivate<NovoComponent> {

    constructor(private router: Router){}

    canDeactivate(component: NovoComponent) {
        if(component.mudancasFormNaoSalvas) {
            return window.confirm('Tem certeza que deseja sair da tela de preenchimento do formulario?');
        }
        return true
    }



}
