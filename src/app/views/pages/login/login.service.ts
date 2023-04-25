import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AuthRequest } from './authRequest';
import { AuthResponse } from './authResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = environment.urlGateway + 'identity';

  constructor(private http: HttpClient) { }

  // TODO: pendiente https
  // pendiente mantener la sesión activa
  // pendiente gestionar si refresca pantalla
  // ojo sesión caducada, token inválido  
  login(authRequest: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.url}/login`, authRequest);
  }

  // TODO: pendiente
  logOff() {
    return this.http.post(this.url + 'logOff', {});
  }
}