import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { LocalStorageService } from '../services/local-storage.service';
import { UserService } from '../services/user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private userService: UserService,
        private router: Router,
        private storage: LocalStorageService
    ) { }

    canActivate(): boolean {
        if (this.storage.get('auth-friends')) {
            return true;
        }

        if (!this.userService.permission) {
            this.router.navigate(['/']);
        }

        return this.userService.permission;
    }
}
