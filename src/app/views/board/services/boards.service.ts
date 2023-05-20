import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetBoardResult } from '../models';
import { environment } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})

export class BoardService {
  private url = `${environment.urlGateway}/boards`;

  constructor(private http: HttpClient) { }
  getBoard(id: number): Observable<GetBoardResult> {
    return this.http.get<GetBoardResult>(`${this.url}/${id}`);
  }
}