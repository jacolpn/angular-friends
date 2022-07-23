import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { API } from 'src/app/app.api';

import { IUser } from '../interfaces/user.interface';

@Injectable()
export class UserService {
	public permission: boolean;
	public user: IUser;

	private apiUrl = `${API}/account`;

	constructor(private http: HttpClient) { }

	get(filters: string): any {
		let url: string;
		url = `${this.apiUrl}`;

		if (filters && filters.length > 0) {
			url = `${url}?${filters}`;
		}

		return this.http.get<IUser>(url);
	}

    patch(id: number, body: any): Observable<IUser | any> {
        return this.http.patch<any>(`${this.apiUrl}/${id}`, body);
    }
}
