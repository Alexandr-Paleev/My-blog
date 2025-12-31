import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User, AuthService } from '../shared/services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AlertService } from '../shared/services/alert.service';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

    form: FormGroup = new FormGroup({}); // Initialize with empty group to avoid strict property init errors
    submitted = false;
    message: string | null = null;

    constructor(
        public auth: AuthService,
        private router: Router,
        private route: ActivatedRoute,
        private alert: AlertService
    ) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe((params: Params) => {
            if (params['loginAgain']) {
                this.message = 'Please enter data';
            } else if (params['authFailed']) {
                this.message = 'Session expired. Please enter data again';
            }
        });

        this.form = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.email
            ]),
            password: new FormControl(null, [
                Validators.required,
                Validators.minLength(6)
            ])
        });
    }

    resetPassword() {
        const email = this.form.get('email').value;
        if (!email) {
            this.alert.warning('Please enter your email first to reset password');
            return;
        }

        this.submitted = true;
        this.auth.resetPassword(email).subscribe(() => {
            this.submitted = false;
            this.alert.success('Password reset email sent. Check your inbox!');
        }, () => {
            this.submitted = false;
        });
    }

    submit() {
        if (this.form.invalid) {
            return;
        }

        this.submitted = true;

        const user: User = {
            email: this.form.value.email,
            password: this.form.value.password
        };

        this.auth.login(user).subscribe(() => {
            this.form.reset();
            this.router.navigate(['/admin', 'dashboard']);
            this.submitted = false;
        }, () => {
            this.submitted = false;
        });
    }
}
