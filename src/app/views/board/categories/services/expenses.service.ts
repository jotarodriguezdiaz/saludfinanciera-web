import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { CreateExpenseCommand } from '../models/expense/create-expense.command';
import { UpdateExpenseCommand } from '../models/expense/update-expense.command';
import { ExpenseResult } from '../models/get-category.result';

@Injectable({
  providedIn: 'root',
})

export class ExpensesService {
  private url = `${environment.urlGateway}/expenses`;

  constructor(private http: HttpClient) { }

  addExpense(command: CreateExpenseCommand): Observable<ExpenseResult> {
  const url = `${this.url}`;
    return this.http.post<ExpenseResult>(url, command);
  }

  updateExpense(command: UpdateExpenseCommand): Observable<ExpenseResult> {
    const url = `${this.url}/${command.expenseId}`;
    return this.http.put<ExpenseResult>(url, command);
  }

  deleteExpense(id: number): Observable<boolean> {
    const url = `${this.url}/${id}`;
    return this.http.delete<boolean>(url);
  }
}