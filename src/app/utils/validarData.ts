import { FormControl } from "@angular/forms";

export class ValidarData {

      static validarCampoData(formControl: FormControl){
        const data = formControl.value;

        if (data && data !== ''){

          if (data.length > 10) return { dataInvalida: true}

          let ano = parseInt(data.substring(0,4));
          let mes = parseInt(data.substring(5,7));
          let dia = parseInt(data.substring(8,10));

          if (mes == 1 && dia > 31) return { dataInvalida: true}
          if (mes == 2 && (ano % 4) ==0 && dia > 29) return { dataInvalida: true}
          if (mes == 2 && (ano % 4) !=0 && dia > 28) return { dataInvalida: true}
          if (mes == 3 && dia > 31) return { dataInvalida: true}
          if (mes == 4 && dia > 30) return { dataInvalida: true}
          if (mes == 5 && dia > 31) return { dataInvalida: true}
          if (mes == 6 && dia > 30) return { dataInvalida: true}
          if (mes == 7 && dia > 31) return { dataInvalida: true}
          if (mes == 8 && dia > 31) return { dataInvalida: true}
          if (mes == 9 && dia > 30) return { dataInvalida: true}
          if (mes == 10 && dia > 31) return { dataInvalida: true}
          if (mes == 11 && dia > 30) return { dataInvalida: true}
          if (mes == 12 && dia > 31) return { dataInvalida: true}
        }

        return null;
      }

}
