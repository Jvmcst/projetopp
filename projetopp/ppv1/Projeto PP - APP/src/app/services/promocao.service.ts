import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Promocao } from '../model/promocao';

@Injectable({
  providedIn: 'root'
})
export class PromocaoService {
 
  httpHeaders = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  url: string = 'http://localhost:8080/api/v1/promocao';

  constructor(private httpClient: HttpClient) { }

  async savePromocao(promocao: Promocao) {
    if (promocao.idPromocao !== 0) {
      return await this.httpClient.put(this.url, JSON.stringify(promocao), this.httpHeaders).toPromise();
    }
    return await this.httpClient.post(this.url, JSON.stringify(promocao), this.httpHeaders).toPromise();
  }

  async findByIdPromocao(idPromocao: number) {
    return await this.httpClient.get(this.url + "/" + idPromocao).toPromise();
  }

  async search(idCategoria: number, idSupermercado: number, searchField: string) {
    return await this.httpClient.get(this.url + "/search/" + idCategoria + "/" + idSupermercado + "/" + searchField).toPromise();
  }

  async list() {
    return await this.httpClient.get(this.url).toPromise();
  }

  async listByUsuario(idUsuario: number) {
    return await this.httpClient.get(this.url + "/usuario/" + idUsuario).toPromise();
  }

  async listSavedByUsuario(idUsuario: number) {
    return await this.httpClient.get(this.url + "/" + idUsuario + "/salvos").toPromise();
  }

  async remove(idPromocao: number) {
    return await this.httpClient.delete(this.url + "/" + idPromocao).toPromise();
  }

  async listToday() {
    return await this.httpClient.get(this.url + "/today").toPromise();
  }

  async updateRelevancia(idPromocao: number){
    return await this.httpClient.get(this.url + "/relevancia/" + idPromocao).toPromise();
  }
}