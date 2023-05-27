import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { BoardService } from '../../services';
import { GetBoardResult } from '../../models';
import { ToastService } from 'src/app/core/toast/toast.service';

@Component({
    selector: 'app-update-board',
    templateUrl: './update-board.component.html',
    styleUrls: ['./update-board.component.scss']
})
export class UpdateBoardComponent {
    @Input() id!: number;
    @Output() boardUpdated = new EventEmitter();

    form!: FormGroup;
    visible = false;
    validated = false;
    spinner = false;

    get f() { return this.form.controls; }

    constructor(
        private service: BoardService,
        private formBuilder: FormBuilder,
        private toastService: ToastService) {
        this.createForm();
    }

    handleUpdateChange = (event: any) => this.visible = event;    

    openModalUpdate() {
        this.loadBoard();
        this.createForm();
        this.validated = false;
        this.visible = !this.visible;
    }

    private loadBoard() {
        this.spinner = true;
        this.service.getBoard(this.id)
            .pipe(finalize(() => this.spinner = false))
            .subscribe(board => this.fillForm(board));
    }

    fillForm = (board: GetBoardResult) => this.form.reset(board);

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
            command.boardId = this.id;

            this.spinner = true;
            this.service.updateBoard(command)
                .pipe(finalize(() => this.spinner = false))
                .subscribe({
                    next: () => {
                        this.showMessage();
                        this.cleanForm();
                        this.visible = false;
                        this.boardUpdated.emit();
                        this.toastService.success('Se ha actualizado el tablero correctamente');
                    },
                    error: () => {
                        this.toastService.danger('Se ha producido un error. Inténtelo más tarde');
                    }
                });
        }
    }

    private cleanForm = () => this.form.reset();

    private showMessage = () => console.log('ok');
}
