import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { CategoriesService } from '../../services/categories.service';
import { I18nService } from '../../../../../core/i18n/i18n.service';
import { ToastService } from '../../../../../core/toast/toast.service';

@Component({
    selector: 'app-create-category',
    templateUrl: './create-category.component.html'
})
export class CreateCategoryComponent {
    @Input() boardId!: number;
    @Output() categoryCreated = new EventEmitter();

    visible = false;
    form!: FormGroup;
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
        private service: CategoriesService,
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
            command.boardId = this.boardId;

            this.spinner = true;
            this.service.addCategory(command)
                .pipe(finalize(() => this.spinner = false))
                .subscribe({
                    next: () => {
                        this.cleanForm();
                        this.visible = false;
                        this.categoryCreated.emit();
                        this.toastService.success(this.translate.translate('seHaCreadoCorrectamenteCategoria'));
                    },
                    error: () => {
                        this.toastService.danger(this.translate.translate('seHaProducidoUnError'));
                    }
                });
        }
    }

    private cleanForm = () => this.form.reset();
}
