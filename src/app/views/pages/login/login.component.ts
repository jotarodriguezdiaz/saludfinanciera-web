import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

import {
  AuthService,
  LoginService,
  AuthRequest,
  AuthResponse
} from 'src/app/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = ''; // TODO: hay alguna manera de pasar esto de forma más segura en angular?    
  spinner = false;

  constructor(
    private service: LoginService,
    private authService: AuthService,
    private router: Router) { }

  // TODO: servicio para captar distintos tipos de errores. 
  // ayuda chatgpt

  login() {
    const authRequest = {
      email: this.email,
      password: this.password
    } as AuthRequest;

    // NOTIFICACIÓN SI SE EQUIVOCA

    this.spinner = true;
    this.service.login(authRequest)
      .pipe(finalize(() => this.spinner = false))
      .subscribe((res: AuthResponse) => {
        this.authService.saveToken(res.token)
        this.router.navigate(['/dashboard']);
      })
  }

}
