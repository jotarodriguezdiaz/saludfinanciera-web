import { Component, Input } from '@angular/core';
import { GetCategoryResult } from '../../models';
import { EPeriod } from 'src/app/shared/enums/period.enum';

@Component({
    selector: 'app-summary',
    templateUrl: './summary.component.html',
    styleUrls: ['./summary.component.scss']
})
export class SummaryComponent {
    @Input() period!: EPeriod;

    private _categories: GetCategoryResult[] = [];
    @Input()
    set categories(value: GetCategoryResult[]) {
        this._categories = value;
        this.calcSummary();
    }

    get categories(): GetCategoryResult[] {
        return this._categories;
    }

    periodEnum = EPeriod;
    totalIncomes!: number;
    totalExpenses!: number;
    total!: number;
    isBenefit: boolean = false;

    constructor() { }

    private calcSummary() {
        this.totalIncomes = this.categories.reduce((total, category) => {
            const incomesForPeriod = category.incomes.filter(income => income.period === this.period);
            const categoryTotalIncomes = incomesForPeriod.reduce((subtotal, income) => subtotal + income.amount, 0);
            return total + categoryTotalIncomes;
        }, 0);

        this.totalExpenses = this.categories.reduce((total, category) => {
            const expensesForPeriod = category.expenses.filter(expense => expense.period === this.period);
            const categoryTotalExpenses = expensesForPeriod.reduce((subtotal, expense) => subtotal + expense.amount, 0);
            return total + categoryTotalExpenses;
        }, 0);

        this.isBenefit = this.totalIncomes >= this.totalExpenses;
        this.total = this.totalIncomes - this.totalExpenses
    }
}