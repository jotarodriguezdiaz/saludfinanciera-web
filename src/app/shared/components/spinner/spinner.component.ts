import { Component, Input } from "@angular/core";
import { I18nService } from "src/app/core/i18n/i18n.service";

@Component({
  selector: "app-spinner",
  template: `
    <div *ngIf="active" class="spinner-overlay">
    <div class="d-flex align-items-center justify-content-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">{{mensaje}}...</span>
      </div>
    </div>
  </div>`,
  styleUrls: ['./spinner.component.scss']
}) export class SpinnerComponent {
  @Input() active = false;
  @Input() mensaje!: string;

  constructor(translate: I18nService) {
    if (this.mensaje == null) this.mensaje = translate.translate('cargando');
  }
}