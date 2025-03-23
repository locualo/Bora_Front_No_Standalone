import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Palmares } from '../interfaces/palmares/palmares';
import { RequestRecCarr } from '../interfaces/carreras/requestRecCarr';
import { ResponseRecCarr } from '../interfaces/carreras/responseRecCarr';
import { RequestLogrosPorCorredor } from '../interfaces/corredor/requestLogrosPorCorredor';
import { ResponseLogrosPorCorredor } from '../interfaces/corredor/responseLogrosPorCorredor';
@Injectable({
    providedIn: 'root'
  })
export class JsoncarreraconformadaService {
    private readonly baseUrl = 'http://localhost:8080';
    constructor(private readonly http: HttpClient) {}

    getCarreraconformada(request: RequestRecCarr): Observable<ResponseRecCarr> {
        return this.http.post<ResponseRecCarr>(`${this.baseUrl}/recuperarCarreras`, request , { responseType: 'json' });
    }

    getPalmaresSelectoPorTemporada(id: number): Observable<Palmares> {
        return this.http.post<Palmares>(`${this.baseUrl}/palmaresTemporada`, id , { responseType: 'json' });
    }

    getLogrosPorCorredor(request: RequestLogrosPorCorredor): Observable<ResponseLogrosPorCorredor> {
        return this.http.post<ResponseLogrosPorCorredor>(`${this.baseUrl}/logrosPorCorredor`, request , { responseType: 'json' });
    }
}