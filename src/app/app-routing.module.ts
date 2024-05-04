import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { AuthGuard } from './_helpers';
import { MedicationListComponent } from './_components/medication-list/medication-list.component';
import { OrdonnanceListComponent } from './_components/ordonnance-list/ordonnance-list.component';
import { PatientListComponent } from './_components/patient-list/patient-list.component';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);
const patientsModule = () => import('./_components/patient-list/patients.module').then(x => x.PatientsModule);
//const ordonnancesModule = () => import('./_components/ordonnance-list/ordonnances.module').then(x => x.OrdonnancesModule);
//const medicationsModule = () => import('./_components/medication-list/medications.module').then(x => x.MedicationsModule);


const routes: Routes = [
    { path: '', component: HomeComponent,}, //canActivate: [AuthGuard] },
    { path: 'users', loadChildren: usersModule,},
    { path: 'account', loadChildren: accountModule },
    { path: 'medication', component: MedicationListComponent,},//canActivate: [AuthGuard] },
    { path: 'ordonnance', component: OrdonnanceListComponent,},// canActivate: [AuthGuard] },
    { path: 'patients', loadChildren: patientsModule},

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }