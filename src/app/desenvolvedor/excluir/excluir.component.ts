import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DesenvolvedorDTO } from '../models/DesenvolvedorDTO';
import { DesenvolvedorService } from '../services/desenvolvedorService';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html'
})
export class ExcluirComponent implements OnInit {

  desenvolvedor: DesenvolvedorDTO = new DesenvolvedorDTO();
  errors: any[] = [];

  constructor(private desenvolvedorService: DesenvolvedorService,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService) {

    this.desenvolvedor = this.route.snapshot.data['desenvolvedores'];
  }

  ngOnInit(): void {

  }

  excluirNivel() {
    this.desenvolvedorService.excluirDesenvolvedor(this.desenvolvedor.id)
        .subscribe({
            next: (nivel: any) => this.sucessoExclusao(nivel),
            error: (erro: any) => this.falha(erro)
      });
  }

  sucessoExclusao(evento: any) {

    const toast = this.toastr.success('Desenvolvedor excluido com Sucesso!', 'Excluido');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/desenvolvedor/listadesenvolvedor']);
      });
    }
  }

  falha(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Houve um erro na exclusão!', 'Ops! :(');
  }

}
