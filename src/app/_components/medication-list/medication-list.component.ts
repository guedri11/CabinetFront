import { Component, OnInit } from '@angular/core';
import { Medication } from '../../_models/medication';
import { MedicationService } from '../../_services/medication.service';

@Component({
  selector: 'app-medication-list',
  templateUrl: './medication-list.component.html'
})
export class MedicationListComponent implements OnInit {
  medications: Medication[] = [];

  constructor(private medicationService: MedicationService) { }

  ngOnInit(): void {
    this.getMedications();
  }

  getMedications(): void {
    this.medicationService.getAllMedications()
      .subscribe(medications => this.medications = medications);
  }
}
