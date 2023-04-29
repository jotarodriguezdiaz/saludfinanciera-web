import { Component, Input } from "@angular/core";

@Component({
    selector: "app-spinner",
    template: `<div *ngIf="active" class="spinner-overlay">
                    <div class="spinner spinner-border text-info" role="status">
                        <span class="visually-hidden">Cargando...</span>
                    </div>
                </div>`,
    styleUrls: ['./spinner.component.scss']
}) export class SpinnerComponent {
    @Input() active = false;
    @Input() mensaje = "";
}