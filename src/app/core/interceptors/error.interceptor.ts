import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from './notification.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private notificationService: NotificationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';

        if (error.error instanceof ErrorEvent) {
          // Errores del lado del cliente
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Errores del lado del servidor
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }

        this.notificationService.showError(errorMessage);
        return throwError(errorMessage);
      })
    );
  }
}