import { Injectable } from '@angular/core';
import { ToastService } from '../toast/toast.service';

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    constructor(private toastService: ToastService) { }

    toasts: any[] = [];

    showStandard() {
        this.toastService.show('I am a standard toast');
    }

    showSuccess() {
        this.toastService.show('I am a success toast', { classname: 'bg-success text-light', delay: 3000 });
    }

    showDanger(err: any) {
        this.toastService.show(err, { classname: 'bg-danger text-light', delay: 4000 });
    }
}