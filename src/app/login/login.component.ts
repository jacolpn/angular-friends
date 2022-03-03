import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PoNotificationService } from '@po-ui/ng-components';
import { Subscription } from 'rxjs';

import { Login } from '../shared/interfaces/login.interface';

import { UserService } from '../shared/services/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
    formLogin: FormGroup;
    userSubscription$: Subscription | undefined;

    constructor(
        private route: Router,
        private userService: UserService,
        private poNotification: PoNotificationService,
		private formBuilder: FormBuilder
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
        let filter = `email=${this.formLogin.value.email}&password=${this.formLogin.value.password}`;

        this.userSubscription$ = this.userService.get(filter).subscribe({
            next: (response: Array<Login>) => {
                console.log(response)
                if (response.length > 0) {
                    this.userService.permission = true;
                    this.userService.email = response[0].email;
                    this.poNotification.success('Bem vindo!');
                    this.route.navigate(['/payments']);

                    return;
                }

                this.userService.permission = false;
                this.poNotification.error('Usuário ou senha inválido!')
            },
            error: () => this.poNotification.error('Verifique sua conexão!'),
        });
    }

    ngOnDestroy(): void {
        if (this.userSubscription$ !== undefined) {
            this.userSubscription$.unsubscribe();
        }
    }
}
