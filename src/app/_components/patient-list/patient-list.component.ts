import { Component, OnInit } from '@angular/core';
import { Patient } from '../../_models/patient';
import { PatientService } from '../../_services/patient.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html'
})
export class PatientListComponent implements OnInit {
  patients: Patient[] = [];

  constructor(private patientService: PatientService) { }

  ngOnInit(): void {
    this.getPatients();
  }

  getPatients(): void {
    this.patientService.getPatients()
      .subscribe(patients => {
        this.patients = patients;
      });
  }

  deletePatient(patient: Patient): void {
    this.patientService.deletePatient(patient)
      .subscribe(() => {
        this.patients = this.patients.filter(p => p !== patient);
      });
  }
}
