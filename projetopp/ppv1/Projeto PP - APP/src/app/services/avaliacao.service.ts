import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Avaliacao } from '../model/avaliacao';

@Injectable({
  providedIn: 'root'
})
export class AvaliacaoService {
  async listByIdPromocao(idPromocao: number) {
    return await this.httpClient.get(this.url + "/promocao/" + idPromocao).toPromise();
  }


  httpHeaders = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  url: string = 'http://localhost:8080/api/v1/avaliacao';

  constructor(private httpClient: HttpClient) { }

  async saveAvaliacao(avaliacao: Avaliacao) {
    if (avaliacao.idAvaliacao !== 0) {
      return await this.httpClient.put(this.url, JSON.stringify(avaliacao), this.httpHeaders).toPromise();
    }
    return await this.httpClient.post(this.url, JSON.stringify(avaliacao), this.httpHeaders).toPromise();
  }

  async findByIdAvaliacao(idAvaliacao: number) {
    return await this.httpClient.get(this.url + "/" + idAvaliacao).toPromise();
  }

  async getAllNumberAvaliacoes(idPromocao: number) {
    return await this.httpClient.get(this.url + "/numberTotal/" + idPromocao).toPromise();
  }

  async getAllNumberLikes(idPromocao: number) {
    return await this.httpClient.get(this.url + "/numberLikes/" + idPromocao).toPromise();
  }

  async findByIdUsuarioIdPromocao(idUsuario: number, idPromocao: number) {
    return await this.httpClient.get(this.url + "/" + idUsuario + "/" + idPromocao).toPromise();
  }

  async list() {
    return await this.httpClient.get(this.url).toPromise();
  }

  async remove(idUsuario: number, idPromocao: number) {
    return await this.httpClient.delete(this.url + "/" + idUsuario + "/" + idPromocao).toPromise();
  }
}
