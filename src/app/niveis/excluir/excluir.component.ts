import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NiveisDTO } from '../models/niveisDTO';
import { NiveisService } from '../services/niveisService';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html'
})
export class ExcluirComponent implements OnInit {

  nivel: NiveisDTO = new NiveisDTO();
  errors: any[] = [];

  constructor(private niveisService: NiveisService,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService) {

    this.nivel = this.route.snapshot.data['niveis'];
  }

  ngOnInit(): void {

  }

  excluirNivel() {
    this.niveisService.excluirNiveis(this.nivel.id)
        .subscribe({
            next: (nivel: any) => this.sucessoExclusao(nivel),
            error: (erro: any) => this.falha(erro)
      });
  }

  sucessoExclusao(evento: any) {

    const toast = this.toastr.success('Nível excluido com Sucesso!', 'Excluido');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/niveis/listaniveis']);
      });
    }
  }

  falha(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Houve um erro na exclusão!', 'Ops! :(');
  }

}
