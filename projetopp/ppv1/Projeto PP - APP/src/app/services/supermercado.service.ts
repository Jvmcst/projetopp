import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, ToastController } from '@ionic/angular';
import { Supermercado } from '../model/supermercado';

@Injectable({
  providedIn: 'root'
})

export class SupermercadoService {

  httpHeaders = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  url: string = 'http://localhost:8080/api/v1/supermercado';

  constructor(private httpClient: HttpClient) { }

  async saveSupermercado(supermercado: Supermercado) {
    if (supermercado.idSupermercado !== 0) {
      return await this.httpClient.put(this.url, JSON.stringify(supermercado), this.httpHeaders).toPromise();
    }
    return await this.httpClient.post(this.url, JSON.stringify(supermercado), this.httpHeaders).toPromise();
  }

  async findNomeByIdSupermercado(idSupermercado: number) {
    return await this.httpClient.get(this.url + "/nome/" + idSupermercado).toPromise();
  }

  async findByIdSupermercado(idSupermercado: number) {
    return await this.httpClient.get(this.url + "/" + idSupermercado).toPromise();
  }

  async list() {
    return await this.httpClient.get(this.url).toPromise();
  }

  async remove(idSupermercado: number) {
    return await this.httpClient.delete(this.url + "/" + idSupermercado).toPromise();
  }
}