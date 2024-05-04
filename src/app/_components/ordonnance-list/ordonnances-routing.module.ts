import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from '../../users/layout.component';
import { OrdonnanceListComponent } from './ordonnance-list.component';
import { OrdonnanceAddEditComponent } from './add-edit.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: OrdonnanceListComponent },
            { path: 'add', component: OrdonnanceAddEditComponent },
            { path: 'edit/:id', component: OrdonnanceAddEditComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrdonnancesRoutingModule { }