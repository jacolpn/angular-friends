import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { UserService } from '../services/user.service';

@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {
    constructor(private userService: UserService, private route: Router) { }

    canActivate(): boolean {
        if (!this.userService.permission) {
            this.route.navigate(['/']);
        }

        return this.userService.permission;
    }
}
