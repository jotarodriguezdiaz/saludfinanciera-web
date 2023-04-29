import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    constructor() { }

    showError(message: string): void {
        alert('error');
        // this.snackBar.open(message, 'Cerrar', {
        //   duration: 5000,
        //   panelClass: ['error-snackbar'],
        // });
    }
}