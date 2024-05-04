import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { OrdonnancesRoutingModule } from './ordonnances-routing.module';
import { OrdonnanceAddEditComponent } from './add-edit.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        OrdonnancesRoutingModule
    ],
    declarations: [
        OrdonnanceAddEditComponent
    ]
})
export class OrdonnancesModule { }