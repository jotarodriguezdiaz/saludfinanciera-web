import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { I18nService } from '../../../../../core/i18n/i18n.service';
import { ToastService } from '../../../../../core/toast/toast.service';
import { EPeriod } from '../../../../../shared/enums/period.enum';
import { IncomeService } from '../../services/incomes.service';
import { IncomeResult } from '../../models/get-category.result';

@Component({
    selector: 'app-create-income',
    templateUrl: './create-income.component.html'
})
export class CreateIncomeComponent {
    @Input() categoryId!: number;
    @Input() modeSummary = false;
    @Output() created = new EventEmitter<IncomeResult>();

    visible = false;
    form!: FormGroup;
    validated = false;
    spinner = false;

    period = EPeriod;

    get f() { return this.form.controls; }

    openModalCreate() {
        this.createForm();
        this.validated = false;
        this.visible = !this.visible;
    }

    handleCreateChange = (event: any) => this.visible = event;

    constructor(
        private service: IncomeService,
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
            period: [this.period.Monthly, Validators.required]
        });
    }

    save() {
        this.validated = true;

        if (this.form.valid) {
            const command = this.form.value;
            command.categoryId = this.categoryId;
            command.period = +this.f.period.value;
            
            this.spinner = true;
            this.service.addIncome(command)
                .pipe(finalize(() => this.spinner = false))
                .subscribe({
                    next: (result: IncomeResult) => {
                        this.cleanForm();
                        this.visible = false;
                        this.created.emit(result);
                        this.toastService.success(this.translate.translate('seHaCreadoCorrectamenteEntrada'));
                    },
                    error: () => {
                        this.toastService.danger(this.translate.translate('seHaProducidoUnError'));
                    }
                });
        }
    }

    private cleanForm = () => this.form.reset();
}
