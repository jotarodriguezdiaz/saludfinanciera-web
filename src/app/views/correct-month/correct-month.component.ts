import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { CorrectMonthService } from './services/correct-month.service';
import { ToastService } from '../../core/toast/toast.service';
import { I18nService } from '../../core/i18n/i18n.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirm-modal/confirmation-modal.component';
import { GetExpensesResult } from './models';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-correct-month',
    templateUrl: './correct-month.component.html'
})
export class CorrectMonthComponent implements OnInit {
    boardId!: number;
    validated = false;
    spinner = false;
    expenses: GetExpensesResult[] = [];

    constructor(
        private route: ActivatedRoute,
        private service: CorrectMonthService,
        private modalService: NgbModal,
        private toastService: ToastService,
        private translate: I18nService) {
    }

    ngOnInit(): void {
        const param = this.route.snapshot.paramMap.get('boardId');
        if (param) {
            this.boardId = +param;
        }

        this.spinner = true;
        this.service.getExpenses(this.boardId)
            .pipe(
                finalize(() => this.spinner = false)
            )
            .subscribe({
                next: (expenses) => {
                    this.expenses = expenses;
                },
                error: () => {
                    this.toastService.danger(this.translate.translate('seHaProducidoUnError'));
                }
            });
    }

    confirmSave() {
        this.validated = true;

        const modalRef = this.modalService.open(ConfirmationModalComponent);

        modalRef.componentInstance.confirmMessage = this.translate.translate('estasSeguroDeRealizarLaCorreccion');
        modalRef.result.then((result) => {
            if (result === 'confirm') {
                this.spinner = true;
                this.save();
            }
        });
    }

    private save() {
        // cuando termine que rediriga a boards

        // if (this.form.valid) {
        //     const command = this.form.value;
        //     command.boardId = this.boardId;

        //     this.spinner = true;
        //     this.service.addCategory(command)
        //         .pipe(finalize(() => this.spinner = false))
        //         .subscribe({
        //             next: () => {
        //                 this.cleanForm();
        //                 this.visible = false;
        //                 this.categoryCreated.emit();
        //                 this.toastService.success(this.translate.translate('seHaCreadoCorrectamenteCategoria'));
        //             },
        //             error: () => {
        //                 this.toastService.danger(this.translate.translate('seHaProducidoUnError'));
        //             }
        //         });
    }

    goBack() {

    }
}