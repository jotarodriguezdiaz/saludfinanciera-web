import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { UpdateFinancialDataCommand } from '../models/update-financial-data.command';

@Injectable({
  providedIn: 'root',
})

export class CalculateNoteService {
  private url = `${environment.urlGateway}/financial-health`;

  constructor(private http: HttpClient) { }

  calc(command: UpdateFinancialDataCommand): Observable<number> {
    const url = `${this.url}`;
    return this.http.post<number>(url, command);
  }
}