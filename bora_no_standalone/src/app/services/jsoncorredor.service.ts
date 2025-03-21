import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseRecCorr } from '../interfaces/corredor/responseRecCorr';
import { CreateVictoria } from '../interfaces/creates/createvictoria';
import { CreatePuestometro } from '../interfaces/creates/createpuestometro';
@Injectable({
  providedIn: 'root'
})
export class JsoncorredorService {
  private readonly baseUrl = 'http://localhost:8080';
  constructor(private readonly http: HttpClient) { }

  getCorredor(): Observable<ResponseRecCorr> {
    return this.http.get<ResponseRecCorr>(`${this.baseUrl}/recuperarCorredores`, {});
  }

  guardarVictoria(vc : CreateVictoria): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/createVictoryLegacy`, vc, {});
  }

  guardarPuestometro(vp : CreatePuestometro): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/createPuestometroLegacy`, vp, {});
  }
}
