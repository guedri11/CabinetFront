import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { MedicationService } from '@app/_services';
import { Medication } from '@app/_models/medication';

@Component({ templateUrl: 'add-edit.component.html' })
export class MedicationAddEditComponent implements OnInit {
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
        private medicationService: MedicationService
    ) { }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];

        // form with validation rules
        this.form = this.formBuilder.group({
            medicineName: ['', Validators.required],
            dosage: ['', Validators.required],
            frequency: [''],
            duration: ['', Validators.required],
            route: [''],
            instructions: ['']
        });

        this.title = 'Add medication';
        if (this.id) {
            // edit mode
            this.title = 'Edit medication';
            this.loading = true;
            this.medicationService.getMedicationById(this.id)
                .pipe(first())
                .subscribe(
                    (medication: Medication) => {
                        this.form.patchValue(medication);
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
        this.saveMedication();
    }

    private saveMedication() {
        const medication = this.form.value;
        if (this.id) {
            this.medicationService.updateMedication(medication)
                .pipe(first())
                .subscribe({
                    next: () => {
                        console.log('Medication updated successfully');
                        this.router.navigate(['/medications']);
                    },
                    error: error => {
                        console.error(error);
                        this.submitting = false;
                    }
                });
        } else {
            this.medicationService.addMedication(medication)
                .pipe(first())
                .subscribe({
                    next: () => {
                        console.log('Medication created successfully');
                        this.router.navigate(['/medications']);
                    },
                    error: error => {
                        console.error(error);
                        this.submitting = false;
                    }
                });
        }
    }
}
