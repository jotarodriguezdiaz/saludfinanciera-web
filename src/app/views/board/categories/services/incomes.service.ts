import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { IncomeResult } from '../models/get-category.result';
import { CreateIncomeCommand } from '../models/income/create-income.command';
import { UpdateIncomeCommand } from '../models/income/update-income.command';

@Injectable({
  providedIn: 'root',
})

export class IncomeService {
  private url = `${environment.urlGateway}/incomes`;

  constructor(private http: HttpClient) { }

  addIncome(command: CreateIncomeCommand): Observable<IncomeResult> {
    const url = `${this.url}`;
    return this.http.post<IncomeResult>(url, command);
  }

  updateIncome(command: UpdateIncomeCommand): Observable<IncomeResult> {
    const url = `${this.url}/${command.incomeId}`;
    return this.http.put<IncomeResult>(url, command);
  }

  deleteIncome(id: number): Observable<boolean> {
    const url = `${this.url}/${id}`;
    return this.http.delete<boolean>(url);
  }
}