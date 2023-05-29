import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateBoardCommand, GetBoardResult, UpdateBoardCommand } from '../models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})

export class BoardService {
  private url = environment.urlGateway + '/boards';

  constructor(private http: HttpClient) { }

  getUserBoards(): Observable<GetBoardResult[]> {
    return this.http.get<GetBoardResult[]>(`${this.url}`);
  }

  getBoard(id: number): Observable<GetBoardResult> {
    return this.http.get<GetBoardResult>(`${this.url}/${id}`);
  }

  addBoard(command: CreateBoardCommand): Observable<number> {
    return this.http.post<number>(`${this.url}`, command);
  }

  updateBoard(command: UpdateBoardCommand): Observable<void> {
    return this.http.put<void>(`${this.url}/${command.boardId}`, command);
  }

  deleteBoard(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  createTemplate(templateNumber: number): Observable<number> {
    const command = { templateNumber }
    return this.http.post<number>(`${this.url}/create-template`, command);
  }
}