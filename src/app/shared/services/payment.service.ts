import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API } from 'src/app/app.api';

import { Payment } from '../interfaces/payment.interface';

@Injectable()
export class PaymentService {
	private apiUrl = `${API}/payments`;

	constructor(private http: HttpClient) { }

	get(filters: string, currentPage: number, pageSize: number): any {
		let url: string;
		url = `${this.apiUrl}?_page=${currentPage}&_limit=${pageSize}`;

		if (filters && filters.length > 0) {
			url = `${url}&${filters}`;
		}

		return this.http.get<Payment>(url);
	}

	post(params: Payment): Observable<any> {
		return this.http.post<any>(this.apiUrl, params);
	}

    update(id: string, body: Payment): Observable<string> {
        return this.http.put<any>(`${this.apiUrl}/${id}`, body);
    }

	delete(id: String): Observable<string> {
        return this.http.delete<any>(`${this.apiUrl}/${id}`);
    }
}
