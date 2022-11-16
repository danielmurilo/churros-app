import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Estado } from 'src/app/models/estado';
import { Municipio } from 'src/app/models/municipio';
import { Pdv } from 'src/app/models/pdv';
import { IbgeApiService } from 'src/app/services/ibge-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;
  //esta diretiva possibilita resetar os validators após submit

  pontoVendaForm: FormGroup = this.fb.group({
    nome: ['', [Validators.required]],
    uf: ['', [Validators.required]],
    municipio: ['', [Validators.required]],
    pdv: ['', [Validators.required]],
    comeca: ['', [Validators.required]],
    termina: ['', [Validators.required]]    
  })

  constructor(private ibge: IbgeApiService, private fb: FormBuilder,) { }

  estados: Estado[] = []
  municipios: Municipio[] = []
  pdvs: Pdv[] = []

  ngOnInit(): void {
    this.ibge.buscarEstados().subscribe(
      (estados)=>{
        this.estados = estados
      })
  }

  buscarCidadesPorEstado(uf: string){
    this.ibge.buscarMunicipiosPorEstado(uf).subscribe(
      (municipios)=>{
        this.municipios = municipios
      }
    )
  }

  salvarPDV(){
    this.pdvs.push(this.pontoVendaForm.value)
    this.pontoVendaForm.reset()
    this.formGroupDirective.resetForm()    
  }

}
