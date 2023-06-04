import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { I18nService } from 'src/app/core/i18n/i18n.service';
import { ToastService } from 'src/app/core/toast/toast.service';
import { CalculateNoteService } from './services/calculate-note.service';
import { finalize } from 'rxjs';
import { GetBoardResult } from '../../boards/models';

@Component({
    selector: 'app-calculate-note',
    templateUrl: './calculate-note.component.html'
})
export class CalculateNoteComponent {
    @Input() board!: GetBoardResult;
    @Output() noteCalculated = new EventEmitter();

    spinner = false;
    visible = false;
    form!: FormGroup;

    get f() { return this.form.controls; }

    constructor(
        private service: CalculateNoteService,
        private toastService: ToastService,
        private translate: I18nService,
        private formBuilder: FormBuilder) {
        this.createForm();
    }

    private createForm() {
        this.form = this.formBuilder.group({
            age: ['', Validators.required],
            richness: ['', Validators.required],
            percentageMonthlyInvestment: ['', Validators.required],
            savingPercentage: ['', Validators.required],
            passive: ['', Validators.required],
        });
    }

    openModal() {
        if (!this.visible) {
            this.createForm();
            this.fill();
        }
        this.visible = !this.visible;
    }

    private fill() {
        this.form.reset({
            age: this.board.age,
            richness: this.board.richness,
            percentageMonthlyInvestment: this.board.percentageMonthlyInvestment,
            savingPercentage: this.board.savingPercentage,
            passive: this.board.passive,
        });
    }

    handleModal = (event: any) => this.visible = event;

    save() {
        if (this.form.valid) {
            const command = this.form.value;
            command.boardId = this.board.boardId;

            this.spinner = true;
            this.service.calc(command)
                .pipe(finalize(() => this.spinner = false))
                .subscribe({
                    next: () => {
                        this.cleanForm();
                        this.visible = false;
                        this.noteCalculated.emit();
                        this.toastService.success(this.translate.translate('seHaCalculadoLaNotaFinanciera'));
                    },
                    error: () => {
                        this.toastService.danger(this.translate.translate('seHaProducidoUnError'));
                    }
                });
        }
    }

    private cleanForm = () => this.form.reset();

}
