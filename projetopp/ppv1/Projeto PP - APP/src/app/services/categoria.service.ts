import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Categoria } from '../model/categoria';

@Injectable({
  providedIn: 'root'
})

export class CategoriaService {
  httpHeaders = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  url: string = 'http://localhost:8080/api/v1/categoria';

  constructor(private httpClient: HttpClient) { }

  async saveCategoria(categoria: Categoria) {
    if (categoria.idCategoria !== 0) {
      return await this.httpClient.put(this.url, JSON.stringify(categoria), this.httpHeaders).toPromise();
    }
    return await this.httpClient.post(this.url, JSON.stringify(categoria), this.httpHeaders).toPromise();
  }

  async findByIdCategoria(idCategoria: number) {
    return await this.httpClient.get(this.url + "/" + idCategoria).toPromise();
  }

  async list() {
    return await this.httpClient.get(this.url).toPromise();
  }

  async remove(idCategoria: number) {
    return await this.httpClient.delete(this.url + "/" + idCategoria).toPromise();
  }
}