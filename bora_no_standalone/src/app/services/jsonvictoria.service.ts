import { Victoria } from '../interfaces/victoria';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class JsonvictoriaService {
  getCarreraconformada() {
    throw new Error('Method not implemented.');
  }
  private baseUrl = 'http://localhost:8002';
  constructor(private http: HttpClient) { }

  getVictoria(): Observable<Victoria[]> {
    return this.http.get<Victoria[]>(`${this.baseUrl}/vir`);
  }
}