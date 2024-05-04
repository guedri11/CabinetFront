import { Component, OnInit } from '@angular/core';
import { Ordonnance } from '../../_models/ordonnance';
import { OrdonnanceService } from '../../_services/ordonnance.service';

@Component({
  selector: 'app-ordonnance-list',
  templateUrl: './ordonnance-list.component.html'
})
export class OrdonnanceListComponent implements OnInit {
  ordonnances: Ordonnance[] = [];

  constructor(private ordonnanceService: OrdonnanceService) { }

  ngOnInit(): void {
    this.getOrdonnances();
  }

  getOrdonnances(): void {
    this.ordonnanceService.getOrdonnances()
      .subscribe(ordonnances => this.ordonnances = ordonnances);
  }
}
