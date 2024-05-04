import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from '../../users/layout.component';
import { MedicationListComponent } from './medication-list.component';
import { MedicationAddEditComponent } from './add-edit.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: MedicationListComponent },
            { path: 'add', component: MedicationAddEditComponent },
            { path: 'edit/:id', component: MedicationAddEditComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MedicationsRoutingModule { }