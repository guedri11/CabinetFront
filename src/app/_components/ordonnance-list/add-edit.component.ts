import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { OrdonnanceService } from '@app/_services';
import { Ordonnance } from '@app/_models/ordonnance';

@Component({ templateUrl: 'add-edit.component.html' })
export class OrdonnanceAddEditComponent implements OnInit {
    form!: FormGroup;
    id?: string;
    title!: string;
    loading = false;
    submitting = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private ordonnanceService: OrdonnanceService
    ) { }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];

        // form with validation rules
        this.form = this.formBuilder.group({
            prescriptionId: ['', Validators.required], // Adjust the form control fields as per your model
            patientId: ['', Validators.required],
            patientAge: ['', Validators.required],
            patientGender: ['', Validators.required],
            patientName: ['', Validators.required],
            doctorName: ['', Validators.required],
            doctorSpecialization: ['', Validators.required],
            dateIssued: ['', Validators.required],
            pharmacyNotes: ['']
        });

        this.title = 'Add Ordonnance';
        if (this.id) {
            // edit mode
            this.title = 'Edit Ordonnance';
            this.loading = true;
            this.ordonnanceService.getOrdonnanceById(this.id)
                .pipe(first())
                .subscribe(
                    (ordonnance: Ordonnance) => {
                        this.form.patchValue(ordonnance);
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
        this.saveOrdonnance();
    }

    private saveOrdonnance() {
        const ordonnance = this.form.value;
        if (this.id) {
            this.ordonnanceService.updateOrdonnance(ordonnance)
                .pipe(first())
                .subscribe({
                    next: () => {
                        console.log('Ordonnance updated successfully');
                        this.router.navigate(['/ordonnances']);
                    },
                    error: error => {
                        console.error(error);
                        this.submitting = false;
                    }
                });
        } else {
            this.ordonnanceService.addOrdonnance(ordonnance)
                .pipe(first())
                .subscribe({
                    next: () => {
                        console.log('Ordonnance created successfully');
                        this.router.navigate(['/ordonnances']);
                    },
                    error: error => {
                        console.error(error);
                        this.submitting = false;
                    }
                });
        }
    }
}
