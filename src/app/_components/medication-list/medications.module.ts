import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MedicationsRoutingModule } from './medcations-routing.module';
import { MedicationAddEditComponent } from './add-edit.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MedicationsRoutingModule
    ],
    declarations: [
        MedicationAddEditComponent
    ]
})
export class MedicationsModule { }