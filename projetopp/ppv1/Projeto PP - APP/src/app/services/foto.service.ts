import { Injectable, numberAttribute } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo} from '@capacitor/camera';
import { Foto } from '../model/foto';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FotoService {

  httpHeaders = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  url: string = 'http://localhost:8080/api/v1/promocao/foto/{id}';

  public foto: Foto;
  constructor(private httpClient: HttpClient) {
    this.foto = new Foto();
  }

  async register() {
    debugger
    const fotoCapturada = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera, 
      quality: 100
    });

    let foto = new Foto();
    foto.webPath = fotoCapturada.webPath;
    this.foto = foto;

    console.log(this.foto);
  }

   async upload(photo: Photo, nomeImagem: string) {
    let response = await fetch(photo.webPath!);
    let blob = await response.blob();

    const formData = new FormData();
    formData.append('file', blob, nomeImagem);
    await this.httpClient.post(this.url, formData).toPromise();
  }

  public async remove() {
    // this.foto = null;
  }
}