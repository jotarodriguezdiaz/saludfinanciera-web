import { Component } from '@angular/core';
import { MontgateService } from './services/montgage.service';
import { finalize } from 'rxjs';
import { Amortization, GetSimulationsResult, Loan } from './models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/core/toast/toast.service';
import { I18nService } from 'src/app/core/i18n/i18n.service';
import { SavingYear } from './models/saving-year';

@Component({
    templateUrl: './debts-simulator.component.html',
    styleUrls: ['./debts-simulator.component.scss']
})
export class DebtsSimulatorComponent {
    spinner = false;

    tabActive = 0;
    loan!: Loan;
    tableAmortization: Amortization[] = [];
    tableSavings: SavingYear[] = [];
    totalYears: number[] = [];
    visible = false;
    simulations: GetSimulationsResult[] = [];

    form!: FormGroup;
    chartLineData!: any;

    get f() { return this.form.controls; }

    constructor(
        private service: MontgateService,
        private toastService: ToastService,
        private translate: I18nService,
        private formBuilder: FormBuilder) {
        this.createForm();
    }

    private createForm() {
        this.form = this.formBuilder.group({
            import: ['', Validators.required],
            typeInterest: ['', Validators.required],
            time: ['', Validators.required],
            annualProfitability: ['', Validators.required],
            taxes: ['', Validators.required],
            monthlySaving: ['', Validators.required]
        });
    }

    simulate() {
        if (this.form.valid) {
            this.service.simulate(
                this.f.import.value,
                this.f.typeInterest.value,
                this.f.time.value,
                this.f.annualProfitability.value,
                this.f.taxes.value,
                this.f.monthlySaving.value)
                .pipe(finalize(() => this.spinner = false))
                .subscribe(loan => {
                    this.loan = loan;
                    this.tableAmortization = loan.tableAmortization;
                    this.tableSavings = loan.tableSavings;

                    this.totalYears = Array.from({ length: this.f.time.value }, (_, i) => i + 1); // Genera el array        

                    this.fillStats();
                });
        } else {
            this.toastService.warning(this.translate.translate('rellenaTodosLosCamposObligatorios'));
        }
    }

    private fillStats() {
        const amortized = this.tableAmortization.map(i => Math.round(i.capitalPending));
        const saving = this.tableSavings.map(i => Math.round(i.accumulatedSaving));

        this.chartLineData = {
            labels: this.totalYears,
            datasets: [
                {
                    label: 'Evolución deuda',
                    backgroundColor: 'rgba(220, 220, 220, 0.2)',
                    borderColor: 'rgba(25, 135, 84, 1)',
                    pointBackgroundColor: 'rgba(220, 220, 220, 1)',
                    pointBorderColor: '#fff',
                    data: amortized
                },
                {
                    label: 'Evolución ahorro',
                    backgroundColor: 'rgba(151, 187, 205, 0.2)',
                    borderColor: 'rgba(151, 187, 205, 1)',
                    pointBackgroundColor: 'rgba(151, 187, 205, 1)',
                    pointBorderColor: '#fff',
                    data: saving
                }
            ]
        };
    }

    openModal() {
        if (!this.visible) {
            this.loadSimulations();
        } else {
            this.simulations = [];
        }
        this.visible = !this.visible;
    }

    handleModal = (event: any) => this.visible = event;

    private loadSimulations() {
        this.service.getSimulations().subscribe(result => this.simulations = result);
    }

    selectSimulation(simulation: GetSimulationsResult) {
        this.openModal();

        this.form.reset({
            import: simulation.import,
            typeInterest: simulation.typeInterest,
            time: simulation.time,
            annualProfitability: simulation.annualProfitability,
            taxes: simulation.taxes,
            monthlySaving: simulation.monthlySaving
        });

        this.simulate();
    }

    createSimulation() {
        const command = this.form.value;

        this.spinner = true;
        this.form.markAsPristine();
        this.service.addSimulation(command)
            .pipe(finalize(() => this.spinner = false))
            .subscribe(() =>
                this.toastService.success(this.translate.translate('seHaCreadoLaSimulacionConExito'))
            );
    }
}