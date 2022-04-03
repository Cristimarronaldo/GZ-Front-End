import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent, merge, Observable } from 'rxjs';

import { ToastrService } from 'ngx-toastr';

import { DisplayMessage, GenericoValidator, ValidationMessages } from 'src/app/utils/generico-form-validation';
import { NiveisDTO } from '../models/niveisDTO';
import { NiveisService } from '../services/niveisService';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errors: any[] = [];
  niveisForm: FormGroup;
  niveis: NiveisDTO = new NiveisDTO();
  validationMessages: ValidationMessages;
  genericoValidator: GenericoValidator;
  displayMessage: DisplayMessage = {};

  constructor(private fb: FormBuilder,
               private niveisService: NiveisService,
               private router: Router,
               private toastr: ToastrService,
               private route: ActivatedRoute) {
     this.validationMessages = {
          Nivel: {
                    required: 'Informe o Nível',
                 }
     };

     this.genericoValidator = new GenericoValidator(this.validationMessages);

     this.niveis = this.route.snapshot.data['niveis'];
 }

  ngOnInit(): void {

    this.niveisForm = this.fb.group({
      id: 0,
      nivel: ['', [Validators.required]]
    });

    this.preencherFormulario();
  }

  preencherFormulario() {
    this.niveisForm.patchValue({
      id: this.niveis.id,
      nivel: this.niveis.nivel
    });
  }

  ngAfterViewInit() {
    this.configurarElementoValidacao();
  }

  configurarElementoValidacao() {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.validarFormulario();
    });
  }

   validarFormulario() {
    this.displayMessage = this.genericoValidator.processarMensagens(this.niveisForm);
  }

  editarNiveis() {
    if (this.niveisForm.dirty && this.niveisForm.valid) {

      this.niveis = Object.assign({}, this.niveis, this.niveisForm.value);

      this.niveisService.atualizarNiveis(this.niveis)
          .subscribe({
            next: (sucesso: any) => this.processarSucesso(sucesso),
            error: (fail: any) => this.processarFalha(fail)
        });
    }
  }

  processarSucesso(response: any) {
    this.errors = [];

    let toast = this.toastr.success('Nível atualizado com sucesso!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/niveis/listaniveis']);
      });
    }
  }

  processarFalha(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

}
