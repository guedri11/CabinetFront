import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';
import { User } from '@app/_models';

@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponent implements OnInit {
    form: FormGroup;
    user: User;
    id?: string;
    title!: string;
    loading = false;
    submitting = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
    ) {
        this.user = {} as User;
        // form with validation rules
        this.form = this.formBuilder.group({
            prenom: ['', Validators.required],
            nom: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', [Validators.minLength(6), ...(this.id ? [] : [Validators.required])]],
            adresse: [''],
            email: [''],
            telephone: ['']
        });
    }

        this.title = 'Add Patient';
        if (this.id) {
            // edit mode
            this.title = 'Edit Patient';
            this.loading = true;
            this.accountService.getById(this.id)
                .pipe(first())
                .subscribe(
                    (user: User) => {
                        this.form.patchValue(user);
                        this.loading = false;
                    },
                    error => {
                        this.alertService.error(error);
                        this.loading = false;
                    }
                );
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.submitting = true;
        this.saveUser();
    }

    private saveUser() {
        const user = this.form.value;
        if (this.id) {
            this.accountService.update(this.id, user)
                .pipe(first())
                .subscribe({
                    next: () => {
                        this.alertService.success('User updated successfully', { keepAfterRouteChange: true });
                        this.router.navigate(['/users']);
                    },
                    error: error => {
                        this.alertService.error(error);
                        this.submitting = false;
                    }
                });
        } else {
            this.accountService.register(user)
                .pipe(first())
                .subscribe({
                    next: () => {
                        this.alertService.success('User created successfully', { keepAfterRouteChange: true });
                        this.router.navigate(['/users']);
                    },
                    error: error => {
                        this.alertService.error(error);
                        this.submitting = false;
                    }
                });
        }
    }
}
