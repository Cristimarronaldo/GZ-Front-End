import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fromEvent, merge } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

import { DisplayMessage, GenericoValidator, ValidationMessages } from 'src/app/utils/generico-form-validation';
import { ToastrService } from 'ngx-toastr';
import { NiveisService } from '../services/niveisService';
import { NiveisDTO } from '../models/niveisDTO';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errors: any[] = [];
  niveisForm: FormGroup;
  niveis: NiveisDTO = new NiveisDTO();
  validationMessages: ValidationMessages;
  genericoValidator: GenericoValidator;
  displayMessage: DisplayMessage = {};
  mudancasFormNaoSalvas: boolean;
  model: NgbDateStruct;

  constructor(private fb: FormBuilder,
              private niveisService: NiveisService,
              private router: Router,
              private toastr: ToastrService) {

    this.validationMessages = {
      nivel: {
        required: 'Informe o Nível',
      }
    };

    this.genericoValidator = new GenericoValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.niveisForm = this.fb.group({
      nivel: ['', [Validators.required]]
    });
  }

  ngAfterViewInit(): void {

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
    this.mudancasFormNaoSalvas = true;
  }

  adicionarNiveis() {
    if (this.niveisForm.dirty && this.niveisForm.valid) {

      this.niveis = Object.assign({}, this.niveis, this.niveisForm.value);

      this.niveisService.novoNiveis(this.niveis)
        .subscribe({
            next: (sucesso: any) => this.processarSucesso(sucesso),
            error: (fail: any) => this.processarFalha(fail)
        });

    }
  }

  processarSucesso(response: any) {
    this.niveisForm.reset();
    this.errors = [];

    this.mudancasFormNaoSalvas = false;

    let toast = this.toastr.success('Fornecedor cadastrado com sucesso!', 'Sucesso!');
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
