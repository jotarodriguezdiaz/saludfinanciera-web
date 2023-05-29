import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { CorrectMonthService } from './services/correct-month.service';
import { ToastService } from '../../core/toast/toast.service';
import { I18nService } from '../../core/i18n/i18n.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirm-modal/confirmation-modal.component';
import { CorrectMonthCommand, GetExpensesResult } from './models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-correct-month',
    templateUrl: './correct-month.component.html'
})
export class CorrectMonthComponent implements OnInit {
    boardId!: number;
    validated = false;
    spinner = false;
    expenses: GetExpensesResult[] = [];
    totalFinalAmount: number = 0;

    get totalAmount() {
        return this.expenses.reduce((total, expense) => total + expense.amount, 0);
    }

    // get totalFinalAmount() {
    //     return this.expenses.reduce((total, expense) => total + expense.finalValue, 0);
    // }

    constructor(
        private cdr: ChangeDetectorRef,
        private route: ActivatedRoute,
        private service: CorrectMonthService,
        private modalService: NgbModal,
        private toastService: ToastService,
        private translate: I18nService,
        private router: Router) {
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
                    this.expenses = expenses.map(expense => ({
                        ...expense,
                        finalValue: expense.amount
                    }));
                    this.calcTotalAmount();
                },
                error: () => {
                    this.toastService.danger(this.translate.translate('seHaProducidoUnError'));
                }
            });
    }

    calcTotalAmount() {
        this.totalFinalAmount = this.expenses.reduce((total, expense) => total + expense.finalValue, 0);
    }

    confirmSave() {
        if (this.isFormInvalid()) {
            this.toastService.warning(this.translate.translate('rellenaTodosLosCampos'));
        } else {
            const modalRef = this.modalService.open(ConfirmationModalComponent);

            modalRef.componentInstance.confirmMessage = this.translate.translate('estasSeguroDeRealizarLaCorreccion');
            modalRef.result.then((result) => {
                if (result === 'confirm') {
                    this.save();
                }
            });
        }
    }

    private isFormInvalid(): boolean {
        return this.expenses.some(i => i.finalValue == null);
    }

    private save() {
        const errorMargin = ((this.totalFinalAmount - this.totalAmount) / this.totalAmount) * 100;

        const command = {
            // En backend hay que restar a los ingresos los gastos para saber el amount
            boardId: this.boardId,
            amount: this.totalFinalAmount,
            errorMargin
        } as CorrectMonthCommand;

        this.spinner = true;
        this.service.correctMonth(command)
            .pipe(finalize(() => this.spinner = false))
            .subscribe(() => {
                this.toastService.success(this.translate.translate('seHaCorregidoElMesCorrectamente'));
                this.goBack();
            })
    }

    goBack = () => this.router.navigate(['./board', this.boardId]);
}