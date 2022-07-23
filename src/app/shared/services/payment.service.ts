import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { API } from 'src/app/app.api';

import { IPayment } from '../interfaces/payment.interface';

@Injectable()
export class PaymentService {
	private apiUrl = `${API}/tasks`;

	constructor(private http: HttpClient) { }

	get(filters: string, currentPage: number, pageSize: number): any {
		let url: string;
		url = `${this.apiUrl}?_sort=id&_order=desc&_page=${currentPage}&_limit=${pageSize}`;

		if (filters !== '') {
			url = `${url}${filters}`;
		}

		return this.http.get<IPayment>(url, { observe: 'response' });
	}

	post(params: IPayment): Observable<any> {
		return this.http.post<any>(this.apiUrl, params);
	}

    patch(id: number, body: IPayment): Observable<IPayment> {
        return this.http.patch<any>(`${this.apiUrl}/${id}`, body);
    }

	put(id: number, body: any): Observable<IPayment | any> {
        return this.http.put<any>(`${this.apiUrl}/${id}`, body);
    }

	delete(id: string | number) {
        return this.http.delete<any>(`${this.apiUrl}/${id}`);
    }
}
