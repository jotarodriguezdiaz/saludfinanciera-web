import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { BoardService } from '../../services';
import { ToastService } from 'src/app/core/toast/toast.service';
import { I18nService } from 'src/app/core/i18n/i18n.service';

@Component({
    selector: 'app-create-board',
    templateUrl: './create-board.component.html'
})
export class CreateBoardComponent {
    @Output() boardCreated = new EventEmitter();

    form!: FormGroup;
    visible = false;
    validated = false;
    spinner = false;

    get f() { return this.form.controls; }

    openModalCreate() {
        this.createForm();
        this.validated = false;
        this.visible = !this.visible;
    }

    handleCreateChange = (event: any) => this.visible = event;

    constructor(
        private service: BoardService,
        private formBuilder: FormBuilder,
        private toastService: ToastService,
        private translate: I18nService) {
        this.createForm();
    }

    private createForm() {
        this.form = this.formBuilder.group({
            name: ['', [Validators.required, Validators.maxLength(50)]],
            description: ['', [Validators.maxLength(250)]]
        });
    }

    save() {
        this.validated = true;

        if (this.form.valid) {
            const command = this.form.value;

            this.spinner = true;
            this.service.addBoard(command)
                .pipe(finalize(() => this.spinner = false))
                .subscribe({
                    next: () => {
                        this.cleanForm();
                        this.visible = false;
                        this.boardCreated.emit();
                        this.toastService.success(this.translate.translate('seHaCreadoCorrectamenteTablero'));
                    },
                    error: () => {
                        this.toastService.danger(this.translate.translate('seHaProducidoUnError'));
                    }
                });
        }
    }

    private cleanForm = () => this.form.reset();
}
