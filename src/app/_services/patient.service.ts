import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from '../_models/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private baseUrl = 'http://localhost:8080/pc';

  constructor(private http: HttpClient) { }

  addPatient(patient: Patient): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/add_patient`, patient);
  }

  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.baseUrl}/getPatients`);
  }

  getPatientById(id: number): Observable<Patient> {
    return this.http.get<Patient>(`${this.baseUrl}/getPatientById/${id}`);
  }

  updatePatient(patient: Patient): Observable<boolean> {
    return this.http.put<boolean>(`${this.baseUrl}/update_patient`, patient);
  }

  deletePatient(patient: Patient): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/delete_patient`, { body: patient });
  }
}
