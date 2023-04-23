import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {
  private url = environment.urlFinance + 'board';

  constructor(private http: HttpClient) {}

  getBoards(userId: number, token: string): Observable<any[]> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      })
    };

    return this.http.get<any[]>(`${this.url}/boards/${userId}`, httpOptions);
  }  
}
