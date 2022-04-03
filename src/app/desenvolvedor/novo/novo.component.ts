import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { fromEvent, merge, Observable } from 'rxjs';
import { DisplayMessage, GenericoValidator, ValidationMessages } from 'src/app/utils/generico-form-validation';
import { ValidarData } from 'src/app/utils/validarData';
import { DesenvolvedorDTO, Niveis } from '../models/DesenvolvedorDTO';
import { DesenvolvedorService } from '../services/desenvolvedorService';


@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errors: any[] = [];
  desenvolvedorForm: FormGroup;
  desenvolvedor: DesenvolvedorDTO = new DesenvolvedorDTO();
  validationMessages: ValidationMessages;
  genericoValidator: GenericoValidator;
  displayMessage: DisplayMessage = {};
  mudancasFormNaoSalvas: boolean;
  niveis: Niveis[] = [];

  constructor(private fb: FormBuilder,
              private desenvolvedorService: DesenvolvedorService,
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
                    required: 'Informe a data de nascimento',
                    dataInvalida: 'Data inválida'
                  },
                  sexo:{
                    required: 'Informe o sexo'
                  }
                };

         this.genericoValidator = new GenericoValidator(this.validationMessages);
   }

  ngOnInit(): void {
    this.desenvolvedorForm = this.fb.group({
      nome:  ['', [Validators.required]],
      nivelId: ['', [Validators.required]],
      dataNascimento: ['',[Validators.required, ValidarData.validarCampoData]],
      idade: [''],
      hobby: [''],
      sexo: ['',[Validators.required]]
    });

    this.desenvolvedorForm.patchValue({ sexo: 'M' });

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
    this.mudancasFormNaoSalvas = true;
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

  adicionarDesenvolvedor() {

    if (this.desenvolvedorForm.dirty && this.validarCampos()) {

      this.desenvolvedor = Object.assign({}, this.desenvolvedor, this.desenvolvedorForm.value);


      this.desenvolvedorService.novoDesenvolvedor(this.desenvolvedor)
        .subscribe({
          next: (sucesso: any) => this.processarSucesso(sucesso),
          error: (fail: any) => this.processarFalha(fail)
      });
    }
  }

  validarCampos():boolean{
     let desenv = this.desenvolvedorForm.value;
     if (parseInt(desenv.nivelId) > 0 && desenv.nome !== "" && desenv.dataNascimento !== "" && parseInt(desenv.idade) > 17)
        return true;
     return false;
  }

  processarSucesso(response: any) {
    this.desenvolvedorForm.reset();
    this.errors = [];

    this.mudancasFormNaoSalvas = false;

    let toast = this.toastr.success('Desenvolvedor cadastrado com sucesso!', 'Sucesso!');
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
