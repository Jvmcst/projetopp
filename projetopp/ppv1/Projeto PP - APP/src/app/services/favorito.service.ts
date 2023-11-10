import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Favorito } from '../model/favorito';

@Injectable({
  providedIn: 'root'
})

export class FavoritoService {

  httpHeaders = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  url: string = 'http://localhost:8080/api/v1/favorito';

  constructor(private httpClient: HttpClient) { }

  async saveFavorito(favorito: Favorito) {
    if (favorito.idFavorito !== 0) {
      return await this.httpClient.put(this.url, JSON.stringify(favorito), this.httpHeaders).toPromise();
    }
    return await this.httpClient.post(this.url, JSON.stringify(favorito), this.httpHeaders).toPromise();
  }

  async findByIdFavorito(idFavorito: number) {
    return await this.httpClient.get(this.url + "/" + idFavorito).toPromise();
  }

  async findByIdUsuario(idUsuario: number) {
    return await this.httpClient.get(this.url + "/usuario/" + idUsuario).toPromise();
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