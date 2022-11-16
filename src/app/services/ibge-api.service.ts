import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Estado } from '../models/estado';
import { Municipio } from '../models/municipio';

@Injectable({
  providedIn: 'root'
})
export class IbgeApiService {

  constructor(private http: HttpClient) { }

  private urlUF: string = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome'

  private urlMunicipiosPrefix: string = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/'
  private urlMunicipiosSufix: string = '/municipios' 

  buscarEstados(){
    return this.http.get<Estado[]>(this.urlUF)
  }

  buscarMunicipiosPorEstado(uf: string){
    return this.http.get<Municipio[]>(this.urlMunicipiosPrefix + uf + this.urlMunicipiosSufix)
  }
}
