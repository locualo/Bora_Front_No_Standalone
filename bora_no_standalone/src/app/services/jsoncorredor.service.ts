import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Corredor } from '../interfaces/corredor';
@Injectable({
  providedIn: 'root'
})
export class JsoncorredorService {
  private baseUrl = 'http://localhost:8001';
  constructor(private http: HttpClient) { }

  getCorredor(): Observable<Corredor[]> {
    return this.http.get<Corredor[]>(`${this.baseUrl}/cor`);
  }
}
