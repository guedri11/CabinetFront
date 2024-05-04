import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ordonnance } from '../_models/ordonnance';

@Injectable({
  providedIn: 'root'
})
export class OrdonnanceService {
  private baseUrl = 'http://localhost:8080/oc';

  constructor(private http: HttpClient) { }

  generatePdf(data: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/gpdf?data=${data}`, { responseType: 'blob' });
  }

  getOrdonnances(): Observable<Ordonnance[]> {
    return this.http.get<Ordonnance[]>(`${this.baseUrl}/getOrdonnances`);
  }

  addOrdonnance(ordonnance: Ordonnance): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/add_ordonnance`, ordonnance);
  }

  updateOrdonnance(ordonnance: Ordonnance): Observable<boolean> {
    return this.http.put<boolean>(`${this.baseUrl}/update_ordonnance`, ordonnance);
  }

  deleteOrdonnance(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/delete_ordonnance?id=${id}`);
  }
}
