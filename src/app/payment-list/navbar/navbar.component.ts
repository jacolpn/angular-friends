import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/shared/services/user.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    email: string = '';

    constructor(private userService: UserService) { }

    ngOnInit(): void {
        this.email = this.userService.email;
    }

    logout() {
        this.userService.permission = false;
        window.open('/', '_parent');
    }
}
