import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carrera } from '../interfaces/carrera';
import { Palmares } from '../interfaces/palmares/palmares';
@Injectable({
    providedIn: 'root'
  })
export class JsoncarreraconformadaService {
    private readonly baseUrl = 'http://localhost:8080';
    constructor(private readonly http: HttpClient) {}

    getCarreraconformada(): Observable<Carrera[]> {
        return this.http.get<Carrera[]>(`${this.baseUrl}/carrera`);
    }

    getPalmaresSelectoPorTemporada(id: number): Observable<Palmares> {
        return this.http.post<Palmares>(`${this.baseUrl}/palmaresTemporada`, id , { responseType: 'json' });
    }
}