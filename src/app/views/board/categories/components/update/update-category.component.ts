import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { CategoriesService } from '../../services/categories.service';
import { ToastService } from '../../../../../core/toast/toast.service';
import { GetCategoryResult } from '../../models';
import { I18nService } from '../../../../../core/i18n/i18n.service';

@Component({
    selector: 'app-update-category',
    templateUrl: './update-category.component.html'
})
export class UpdateBoardComponent {
    @Input() category!: GetCategoryResult;
    @Input() boardId!: number;
    @Output() boardUpdated = new EventEmitter();

    form!: FormGroup;
    visible = false;
    validated = false;
    spinner = false;

    get f() { return this.form.controls; }

    constructor(
        private service: CategoriesService,
        private formBuilder: FormBuilder,
        private toastService: ToastService,
        private translate: I18nService) {
        this.createForm();
    }

    handleUpdateChange = (event: any) => this.visible = event;

    openModalUpdate() {
        this.createForm();
        this.fillForm();
        this.validated = false;
        this.visible = !this.visible;
    }

    fillForm = () => this.form.reset(this.category);

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
            command.categoryId = this.category.categoryId;

            this.spinner = true;
            this.service.updateCategory(command.categoryId, command)
                .pipe(finalize(() => this.spinner = false))
                .subscribe({
                    next: () => {
                        this.cleanForm();
                        this.visible = false;
                        this.boardUpdated.emit();
                        this.toastService.success(this.translate.translate('seHaActualizadoCategoriaCorrectamente'));
                    },
                    error: () => {
                        this.toastService.danger(this.translate.translate('seHaProducidoUnError'));
                    }
                });
        }
    }

    private cleanForm = () => this.form.reset();
}
