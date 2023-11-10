import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Usuario } from "../model/usuario";

@Injectable({
  providedIn: "root"
})

export class UsuarioService {

  httpHeaders = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  }

  url: string = "http://localhost:8080/api/v1/usuario";

  constructor(private httpClient: HttpClient) { }

  async saveUsuario(usuario: Usuario) {
    if (usuario.idUsuario !== 0) {
      return await this.httpClient.put(this.url, JSON.stringify(usuario), this.httpHeaders).toPromise();
    }
    return await this.httpClient.post(this.url, JSON.stringify(usuario), this.httpHeaders).toPromise();
  }

  async login(email: string, senha: string) {
    return await this.httpClient.get(this.url + "/" + email + "/" + senha + "/authenticate").toPromise();
  }

  async recoverPassword(email: string) {
    return await this.httpClient.get(this.url + "/" + email + "/recover").toPromise();
  }

  async remove(idUsuario: number) {
    return await this.httpClient.delete(this.url + "/" + idUsuario).toPromise();
  }

  saveIdUsuario(idUsuario: number) {
    localStorage.setItem("idUsuarioSession", JSON.stringify(idUsuario));
  }

  async checkEmail(email: string) {
    return await this.httpClient.get(this.url + "/email/" + email + "/exists").toPromise();
  }

  async checkDev(email: string) {
    return await this.httpClient.get(this.url + "/dev/" + email + "/authenticate").toPromise();
  }

  recoverIdUsuario() {
    return JSON.parse(localStorage.getItem("idUsuarioSession") || "0");
  }

  async findByIdUsuario(id: number) {
    return await this.httpClient.get(this.url + "/" + id).toPromise();
  }

  isSession() {
    if (this.recoverIdUsuario() === 0 || Number.isNaN(this.recoverIdUsuario())) {
      return false;
    }
    return true;
  }
}