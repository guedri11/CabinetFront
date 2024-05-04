import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from '../../users/layout.component';
import { PatientListComponent } from './patient-list.component';
import { PatientAddEditComponent } from './add-edit.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: PatientListComponent },
            { path: 'add', component: PatientAddEditComponent },
            { path: 'edit/:id', component: PatientAddEditComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PatientsRoutingModule { }