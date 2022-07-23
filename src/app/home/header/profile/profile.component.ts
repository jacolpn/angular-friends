import { Router } from '@angular/router';
import { Component, Input, OnInit, ViewChild, OnDestroy } from '@angular/core';

import { PoNotificationService } from '@po-ui/ng-components';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

import { UserService } from './../../../shared/services/user.service';

import { IUser } from './../../../shared/interfaces/user.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
    @ViewChild('profile', { static: true }) profile: any;

    @Input() properties: IUser;

    subscription$: Subscription[] = [];
    user: Array<any> = [];
    showEditPassword: boolean;
    newPassword: string;
    newPasswordAgain: string;

    constructor(
        private userService: UserService,
        private router: Router,
        private translate: TranslateService,
        private poNotification: PoNotificationService
    ) { }

    ngOnInit(): void {
        this.newPassword = '';
        this.newPasswordAgain = '';
        this.properties = this.userService.user;
        this.user = [
            { property: 'user', label: this.translate.instant('myPicpay'), value: this.properties?.user },
            { property: 'email', label: this.translate.instant('myEmail'), value: this.properties?.email },
            { property: 'name', label: this.translate.instant('myName'), value: this.properties?.name },
            { property: 'password', label: this.translate.instant('changePassword'), value: '********' },
            { property: 'logout', label: this.translate.instant('leaveAccount'), value: '' },
        ];
    }

    openModal() {
        this.profile.open();
    }

    onHandleParagraph(property: string): any {
        switch (property) {
            case 'logout':
                this.profile.close();
                this.userService.permission = false;

                return this.router.navigate(['/']);
            case 'password':
                return this.showEditPassword = !this.showEditPassword;
        }
    }

    changePassword() {
        if (this.newPassword === '' && this.newPasswordAgain === '') {
            this.poNotification.error(this.translate.instant('passwordEmpty'));

            return;
        }

        if (this.newPassword !== this.newPasswordAgain) {
            this.poNotification.error(this.translate.instant('differentPassword'));

            return;
        }

        this.subscription$.push(this.userService.patch(this.properties.id, { password: this.newPassword }).subscribe({
                next: (res: any) => {
                    this.resetFields();
                    this.poNotification.success(this.translate.instant('changePasswordSuccess'));
                },
                error: () => this.poNotification.error(this.translate.instant('errorConnection')),
            })
        );
    }

    resetFields() {
        this.newPassword = '';
        this.newPasswordAgain = '';
        this.showEditPassword = false;
    }

    ngOnDestroy(): void {
        if (this.subscription$ !== undefined) {
			this.subscription$.forEach((sub: Subscription) => sub.unsubscribe());
		}
    }
}
