import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { GoalsService } from '../../services/goals.service';
import { ToastService } from '../../../../core/toast/toast.service';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { SimulateGoalResult } from '../../models/simulate-goal.result';
import { CreateGoalCommand } from '../../models';

@Component({
    selector: 'app-create-goal',
    templateUrl: './create-goal.component.html'
})
export class CreateGoalComponent {
    @Input() boardId!: number;
    @Output() goalCreated = new EventEmitter();

    form!: FormGroup;
    visible = false;
    validated = false;
    simulation!: SimulateGoalResult | null;

    spinner = false;
    spinnerSimulate = false;

    get f() { return this.form.controls; }

    openModalCreate() {
        this.createForm();
        this.validated = false;
        this.visible = !this.visible;
    }

    handleCreateChange = (event: any) => this.visible = event;

    constructor(
        private service: GoalsService,
        private formBuilder: FormBuilder,
        private toastService: ToastService,
        private translate: I18nService) {
        this.createForm();
    }

    private createForm() {        
        this.form = this.formBuilder.group({
            description: ['', [Validators.required, Validators.maxLength(250)]],
            cost: [null, [Validators.required]],
            percentageAssigned: [null, [Validators.required, Validators.min(0), Validators.max(100)]]
        });
    }

    save() {
        if (this.simulation && !this.simulation.error) {
            if (this.form.valid) {
                const command = this.form.value;
                command.boardId = this.boardId;

                command.dateEstimated = this.simulation.dateEstimated;
                command.message = this.simulation.message;
                command.numMonths = this.simulation.numMonths;                                                
                command.amountReserved = this.simulation.amountReserved;

                this.spinner = true;
                this.service.addGoal(command)
                    .pipe(finalize(() => this.spinner = false))
                    .subscribe({
                        next: () => {
                            this.cleanForm();
                            this.visible = false;
                            this.goalCreated.emit();
                            this.toastService.success(this.translate.translate('seHaCreadoCorrectamenteTablero'));
                        },
                        error: () => {
                            this.toastService.danger(this.translate.translate('seHaProducidoUnError'));
                        }
                    });
            }
        } else {
            this.toastService.success(this.translate.translate('primeroDebesRealizarUnaSimulacion'));
        }
    }

    simulate() {
        this.simulation = null;
        this.validated = true;

        if (this.form.valid) {
            this.validated = true;

            const command = this.form.value as CreateGoalCommand;
            command.boardId = this.boardId;

            this.spinnerSimulate = true;
            this.service.simulate(command)
                .pipe(finalize(() => this.spinnerSimulate = false))
                .subscribe(result => this.simulation = result);
        }
    }

    deactive() {

    }

    private cleanForm = () => this.form.reset();
}
