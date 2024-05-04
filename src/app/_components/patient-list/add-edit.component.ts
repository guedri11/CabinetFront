import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { PatientService } from '@app/_services';
import { Patient } from '@app/_models/patient';

@Component({ templateUrl: 'add-edit.component.html' })
export class PatientAddEditComponent implements OnInit {
    form!: FormGroup;
    id?: number;
    title!: string;
    loading = false;
    submitting = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private patientService: PatientService
    ) { }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];

        // form with validation rules
        this.form = this.formBuilder.group({
            prenom: ['', Validators.required],
            nom: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', [Validators.minLength(6), ...(this.id ? [] : [Validators.required])]],
            adresse: ['', Validators.required],
            email: ['', Validators.required],
            telephone: ['', Validators.required]
        });

        this.title = 'Add Patient';
        if (this.id) {
            // edit mode
            this.title = 'Edit Patient';
            this.loading = true;
            this.patientService.getPatientById(this.id)
                .pipe(first())
                .subscribe(
                    (patient: Patient) => {
                        this.form.patchValue(patient);
                        this.loading = false;
                    },
                    error => {
                        console.error(error);
                        this.loading = false;
                    }
                );
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.submitting = true;
        this.savePatient();
    }

    private savePatient() {
        const patient = this.form.value;
        if (this.id) {
            this.patientService.updatePatient(patient)
                .pipe(first())
                .subscribe({
                    next: () => {
                        console.log('Patient updated successfully');
                        this.router.navigate(['/patients']);
                    },
                    error: error => {
                        console.error(error);
                        this.submitting = false;
                    }
                });
        } else {
            this.patientService.addPatient(patient)
                .pipe(first())
                .subscribe({
                    next: () => {
                        console.log('Patient created successfully');
                        this.router.navigate(['/patients']);
                    },
                    error: error => {
                        console.error(error);
                        this.submitting = false;
                    }
                });
        }
    }
}
