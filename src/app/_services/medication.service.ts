import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medication } from '../_models/medication';

@Injectable({
  providedIn: 'root'
})
export class MedicationService {
  private baseUrl = 'http://localhost:8080/mc';

  constructor(private http: HttpClient) { }

  getAllMedications(): Observable<Medication[]> {
    return this.http.get<Medication[]>(`${this.baseUrl}/gm`);
  }
  getMedicationById(id: number): Observable<Medication> {
    return this.http.get<Medication>(`${this.baseUrl}/get_med_by_id?id=${id}`);
  }

  addMedication(medication: Medication): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/add_med`, medication);
  }

  updateMedication(medication: Medication): Observable<boolean> {
    return this.http.put<boolean>(`${this.baseUrl}/update_med`, medication);
  }

  deleteMedication(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/delete_med?id=${id}`);
  }
}
