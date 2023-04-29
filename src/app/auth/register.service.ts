import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { RegistrationResponse } from './registration.response';
import { RegistrationRequest } from './registration.request';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private url = environment.urlGateway + 'identity';

  constructor(private http: HttpClient) { }

  register(request: RegistrationRequest): Observable<RegistrationResponse> {
    return this.http.post<RegistrationResponse>(`${this.url}/register`, request);
  }
}