import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  template: `
    <div class="modal-header">
      <h4 class="modal-title">{{ title }}</h4>
      <button type="button" class="btn-close" aria-label="Cerrar" (click)="activeModal.dismiss()"></button>
    </div>
    <div class="modal-body">
      {{ confirmMessage }}
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" (click)="activeModal.dismiss()">{{ 'cancelar' | translate}}</button>
      <button type="button" class="btn btn-danger" (click)="confirm()">{{ 'confirmar' | translate}}</button>
    </div>
  `
})
export class ConfirmationModalComponent {

  @Input() title = 'Confirmación';
  @Input() confirmMessage = '¿Estás seguro?';

  constructor(public activeModal: NgbActiveModal) { }

  confirm() {
    this.activeModal.close('confirm');
  }

}