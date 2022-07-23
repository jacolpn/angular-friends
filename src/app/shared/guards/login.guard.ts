import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { UserService } from '../services/user.service';

@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {
    constructor(private userService: UserService, private router: Router) { }

    canActivate(): boolean {
        if (!this.userService.permission) {
            this.router.navigate(['/']);
        }

        return this.userService.permission;
    }
}
