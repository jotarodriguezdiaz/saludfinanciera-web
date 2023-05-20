import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { I18nService } from '../../../../../core/i18n/i18n.service';
import { ToastService } from '../../../../../core/toast/toast.service';
import { EPeriod } from '../../../../../shared/enums/period.enum';
import { ExpensesService } from '../../services/expenses.service';
import { ERelevance } from 'src/app/shared/enums/relevance.enum';
import { ExpenseResult } from '../../models/get-category.result';

@Component({
    selector: 'app-update-expense',
    templateUrl: './update-expense.component.html'
})
export class UpdateExpenseComponent{
    @Input() expense!: ExpenseResult;
    @Input() categoryId!:number;
    @Output() updated = new EventEmitter<ExpenseResult>();

    loaded = false;
    visible = false;
    form!: FormGroup;
    validated = false;
    spinner = false;

    period = EPeriod;
    relevance = ERelevance;

    get f() { return this.form.controls; }  

    constructor(
        private service: ExpensesService,
        private formBuilder: FormBuilder,
        private toastService: ToastService,
        private translate: I18nService) {
        this.createForm();
    }

    private createForm() {
        this.form = this.formBuilder.group({
            name: ['', [Validators.required, Validators.maxLength(50)]],
            description: ['', [Validators.maxLength(250)]],
            amount: [null, [Validators.required, Validators.pattern(/^\d+(\.\d{2})?$/)]],
            period: [this.period.Monthly, Validators.required],
            expendable: [true, Validators.required],
            variable: [true, Validators.required],
            relevance: [this.relevance.Medium, Validators.required]
        });
    }    
    
    openModalUpdate() {
        this.createForm();
        this.fillForm();
        this.validated = false;
        this.visible = !this.visible;
    }

    fillForm = () => this.form.reset(this.expense);

    handleCreateChange = (event: any) => this.visible = event;  

    save() {
        this.validated = true;

        if (this.form.valid) {
            const command = this.form.value;
            command.expenseId = this.expense.expenseId;
            command.categoryId = this.categoryId;
            command.period = +this.f.period.value;
            command.relevance = +this.f.relevance.value;
            
            this.spinner = true;
            this.service.updateExpense(command)
                .pipe(finalize(() => this.spinner = false))
                .subscribe({
                    next: (result: ExpenseResult) => {
                        this.cleanForm();
                        this.visible = false;
                        this.updated.emit(result);
                        this.toastService.success(this.translate.translate('seHaActualizadoCorrectamenteEntrada'));
                    },
                    error: () => {
                        this.toastService.danger(this.translate.translate('seHaProducidoUnError'));
                    }
                });
        }
    }

    private cleanForm = () => this.form.reset();
}
