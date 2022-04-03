import { ValidarData } from 'src/app/utils/validarData';
import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent, merge, Observable } from 'rxjs';

import { ToastrService } from 'ngx-toastr';

import { DesenvolvedorService } from '../services/desenvolvedorService';
import { DesenvolvedorDTO, Niveis } from '../models/DesenvolvedorDTO';
import { DisplayMessage, GenericoValidator, ValidationMessages } from 'src/app/utils/generico-form-validation';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errors: any[] = [];
  desenvolvedorForm: FormGroup;
  desenvolvedor: DesenvolvedorDTO = new DesenvolvedorDTO();
  validationMessages: ValidationMessages;
  genericoValidator: GenericoValidator;
  displayMessage: DisplayMessage = {};
  niveis: Niveis[] = [];

  constructor(private fb: FormBuilder,
              private desenvolvedorService: DesenvolvedorService,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService) {
       this.validationMessages = {
        nome: {
          required: 'Informe o Nome',
        },
        nivelId:{
          required: 'Informe o Nível'
        },
        dataNascimento:{
          required: 'Informe a data de nascimento'
        },
        sexo:{
          required: 'Informe o sexo'
        }
      };

     this.genericoValidator = new GenericoValidator(this.validationMessages);

     this.desenvolvedor = this.route.snapshot.data["desenvolvedores"];

  }

  ngOnInit(): void {

    this.desenvolvedor.dataNascimento = this.desenvolvedor.dataNascimento.substring(0,10);

    this.desenvolvedorForm = this.fb.group({

      nome:  [this.desenvolvedor.nome, [Validators.required]],
      nivelId: [this.desenvolvedor.nivelId, [Validators.required]],
      dataNascimento: [this.desenvolvedor.dataNascimento,[Validators.required, ValidarData.validarCampoData]],
      idade: [this.desenvolvedor.idade],
      hobby: [this.desenvolvedor.hobby],
      sexo: [this.desenvolvedor.sexo, [Validators.required]],
      id: [this.desenvolvedor.id]
    });

     this.desenvolvedorService.obterTodosNiveis().
     subscribe({
      next: (sucesso: any) => this.niveis = sucesso,
      error: (fail: any) => this.processarFalha(fail)
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
    this.displayMessage = this.genericoValidator.processarMensagens(this.desenvolvedorForm);
  }

  calcularIdade(){
      let desenv = this.desenvolvedorForm.value;
      let data = new Date();

      let dataNascimento = desenv.dataNascimento;
      var nascimento = dataNascimento.split("-");
      let ano = parseInt(nascimento[0]);
      let mes = parseInt(nascimento[1]);
      let dia = parseInt(nascimento[2]);
      let dataAtual = data.toLocaleDateString().split('/');
      let anoAtual = parseInt(dataAtual[2]);
      let mesAtual = parseInt(dataAtual[1]);
      let diaAtual = parseInt(dataAtual[0]);
      let idade = anoAtual - ano;
      if ((idade > 0) && ((mes > mesAtual && ano != anoAtual) || (mes == mesAtual && dia > diaAtual && ano != anoAtual))) --idade;
      idade = idade < 0 ? 0 : idade;

      this.desenvolvedorForm.patchValue({ idade: idade });
  }

  editarDesenvolvedor() {

    if (this.desenvolvedorForm.dirty && this.validarCampos()) {

      this.desenvolvedor = Object.assign({}, this.desenvolvedor, this.desenvolvedorForm.value);

      this.desenvolvedorService.atualizarDesenvolvedor(this.desenvolvedor)
        .subscribe({
          next: (sucesso: any) => this.processarSucesso(sucesso),
          error: (fail: any) => this.processarFalha(fail)
      });
    }
  }

  validarCampos():boolean{
     let desenv = this.desenvolvedorForm.value;

     if (parseInt(desenv.nivelId) > 0 && desenv.nome != "" && desenv.dataNascimento != "" && parseInt(desenv.idade) > 17)
        return true;
     return false;
  }

  processarSucesso(response: any) {
    this.desenvolvedorForm.reset();
    this.errors = [];

    let toast = this.toastr.success('Desenvolvedor alterado com sucesso!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/desenvolvedor/listadesenvolvedor']);
      });
    }
  }

  processarFalha(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

}
