import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateSimulationCommand, GetSimulationsResult, Loan } from '../models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})

export class MontgateService {
  private urlBase = `${environment.urlGateway}`;
  private url = `${environment.urlGateway}/SimulatorDebts`;

  constructor(private http: HttpClient) { }

  getSimulations(): Observable<GetSimulationsResult[]> {
    return this.http.get<GetSimulationsResult[]>(`${this.url}`);
  }

  simulate(importt: number, typeInterest: number, time: number, annualProfitability: number, taxes: number, monthlySaving: number): Observable<Loan> {
    const url = `${this.urlBase}/simulate?import=${importt}&typeInterest=${typeInterest}&time=${time}&annualProfitability=${annualProfitability}&taxes=${taxes}&monthlySaving=${monthlySaving}`;
    return this.http.get<Loan>(url);
  }

  addSimulation(command: CreateSimulationCommand): Observable<boolean> {
    const url = `${this.url}`;
    return this.http.post<boolean>(url, command);
  }

  deleteSimulation(simulationId: number): Observable<boolean> {
    const url = `${this.url}/${simulationId}`;
    return this.http.delete<boolean>(url);
  }
}