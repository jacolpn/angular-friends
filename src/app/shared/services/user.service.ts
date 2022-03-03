import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { API } from 'src/app/app.api';
import { Login } from '../interfaces/login.interface';

@Injectable()
export class UserService {
	public permission: boolean = false;
	public email: string = '';
	private apiUrl = `${API}/users`;

	constructor(private http: HttpClient) { }

	get(filters: string): any {
		let url: string;
		url = `${this.apiUrl}`;

		if (filters && filters.length > 0) {
			url = `${url}/?${filters}`;
		}

		return this.http.get<Login>(url);
	}
}
