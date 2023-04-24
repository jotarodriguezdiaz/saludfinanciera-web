import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { AuthRequest } from './authRequest';
import { AuthService } from '../../../auth/auth.service';
import { AuthResponse } from './authResponse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = ''; // TODO: hay alguna manera de pasar esto de forma más segura en angular?    

  constructor(
    private service: LoginService, 
    private authService: AuthService, 
    private router: Router) { }

  // TODO: servicio para captar distintos tipos de errores. 
  // ayuda chatgpt

  login() {
    // TODO: Si cumple requisito de búsqueda

    const authRequest = {
      email: this.email,
      password: this.password
    } as AuthRequest;

    this.service.login(authRequest)
      .subscribe((res: AuthResponse) => {
        // TODO: Pendiente meterlo a caché
        // no será necesario recuperar de backend los demás datos, solo el token, ahí va todo.        
        this.authService.saveToken(res.token)
        this.router.navigate(['/dashboard']);
      })
  }

}
