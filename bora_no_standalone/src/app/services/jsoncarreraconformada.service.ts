import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carrera } from '../interfaces/carrera';
@Injectable({
    providedIn: 'root'
  })
export class JsoncarreraconformadaService {
    private baseUrl = 'http://localhost:8000';
    constructor(private http: HttpClient) {}

    getCarreraconformada(): Observable<Carrera[]> {
        return this.http.get<Carrera[]>(`${this.baseUrl}/carrera`);
    }
}