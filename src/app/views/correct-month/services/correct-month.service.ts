import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { CorrectMonthCommand, GetExpensesResult } from '../models';

@Injectable({
  providedIn: 'root',
})

export class CorrectMonthService {
  private url = `${environment.urlGateway}/correct-month`;

  constructor(private http: HttpClient) { }

  getExpenses(boardId: number): Observable<GetExpensesResult[]> {
    const url = `${this.url}/boards/${boardId}`;
    return this.http.get<GetExpensesResult[]>(url);
  }

  correctMonth(command: CorrectMonthCommand): Observable<boolean> {
    return this.http.post<boolean>(this.url, command);
  }
}