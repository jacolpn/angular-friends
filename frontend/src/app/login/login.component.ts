import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';
import { PoNotificationService } from '@po-ui/ng-components';

import { Subscription } from 'rxjs';

import { IUser } from '../shared/interfaces/user.interface';

import { LocalStorageService } from '../shared/services/local-storage.service';
import { UserService } from '../shared/services/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
    formLogin: FormGroup;
    subscription$: Subscription[] = [];

    constructor(
        private router: Router,
        private userService: UserService,
        private poNotification: PoNotificationService,
        private translate: TranslateService,
		private formBuilder: FormBuilder,
        private storage: LocalStorageService
    ) {
        this.formLogin = this.formBuilder.group({
			email: [{ value: '', disabled: false, require: true }],
			password: [{ value: '', disabled: false, require: true }]
		});
    }

    ngOnInit(): void {
        this.formLogin.reset();
    }

    login() {
        const filter = `email=${this.formLogin.value.email}`;

        this.subscription$.push(this.userService.get(filter).subscribe({
            next: (response: IUser) => {
                if (response && response.password === this.formLogin.value.password) {
                    this.userService.permission = true;
                    this.userService.user = response;
                    this.poNotification.success(this.translate.instant('welcome'));
                    this.router.navigate(['/home']);
                    this.storage.set('auth-friends', response.email)

                    return;
                }

                this.userService.permission = false;
                this.poNotification.error(this.translate.instant('invalidUserPassword'));
            },
            error: () => this.poNotification.error(this.translate.instant('errorConnection')),
        }));
    }

    ngOnDestroy(): void {
        if (this.subscription$ !== undefined) {
			this.subscription$.forEach((sub: Subscription) => sub.unsubscribe());
		}
    }
}
