import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { CreateGoalCommand, CreateGoalResult, GetGoalResult, GetGoalsResult, UpdateGoalCommand } from '../models';
import { SimulateGoalResult } from '../models/simulate-goal.result';

@Injectable({
  providedIn: 'root',
})

export class GoalsService {
  private url = environment.urlGateway + '/goals';

  constructor(private http: HttpClient) { }

  getUserBoards(boardId: number): Observable<GetGoalsResult[]> {
    return this.http.get<GetGoalsResult[]>(`${this.url}/${boardId}`);
  }

  getBoard(id: number, boardId: number): Observable<GetGoalResult> {
    return this.http.get<GetGoalResult>(`${this.url}/${id}/${boardId}`);
  }

  addGoal(command: CreateGoalCommand): Observable<CreateGoalResult> {
    return this.http.post<CreateGoalResult>(this.url, command);
  }

  updateGoal(id: number, command: UpdateGoalCommand): Observable<any> {
    return this.http.put(`${this.url}/${id}`, command);
  }

  deleteGoal(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

  simulate(command: CreateGoalCommand): Observable<SimulateGoalResult> {
    return this.http.post<SimulateGoalResult>(`${this.url}/simulate`, command);
  }
}