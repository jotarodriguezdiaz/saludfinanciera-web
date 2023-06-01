import { Component, Input, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from '../services/categories.service';
import { GetCategoryResult } from '../models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirm-modal/confirmation-modal.component';
import { ToastService } from 'src/app/core/toast/toast.service';
import { I18nService } from 'src/app/core/i18n/i18n.service';
import { ExpenseResult, IncomeResult, TagResult } from '../models/get-category.result';
import { IncomeService } from '../services/incomes.service';
import { ExpensesService } from '../services/expenses.service';
import { Periods } from './view-periods/periods';
import { EPeriod } from 'src/app/shared/enums/period.enum';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['categories.component.scss']
})
export class CategoriesComponent implements OnInit {
    @Input() boardId!: number;
    @Input() hasPendingCorrection = false;

    spinner = false;
    categories!: GetCategoryResult[];
    periods = new Periods;
    setTags: TagResult[] = [];

    modeSummary = false;
    viewIncomes = true;
    viewExpenses = true;

    visiblePrimaryEstimates = true;
    visibleSecondaryEstimates = false;

    search!: string;

    get filteredCategories(): GetCategoryResult[] {
        let cats = this.categories?.filter(i => i.isVisible === true);

        // Input filter
        if (this.search && this.search.length > 2) {
            cats = cats?.filter(i => i.name?.toLocaleLowerCase().includes(this.search.toLocaleLowerCase()));
        }

        // Tags
        const anyTagVisible = this.setTags.some(i => i.check);
        if (anyTagVisible) {
            const tags = this.setTags.filter(i => i.check).map(i => i.tagId);

            cats.map(category => {
                category.areAllFiltered = true;

                category.expenses.some(expense => {
                    const hasVisibleTag = expense.tags.some(tag => tags.includes(tag.tagId));
                    if (hasVisibleTag) {
                        expense.isVisible = this.viewExpenses && this.isPeriodActive(expense.period);
                        if (expense.isVisible) {
                            category.areAllFiltered = false;
                        }
                    } else {
                        expense.isVisible = false;
                    }
                });

                category.incomes.some(income => {
                    const hasVisibleTag = income.tags.some(tag => tags.includes(tag.tagId));
                    if (hasVisibleTag) {
                        income.isVisible = this.viewIncomes && this.isPeriodActive(income.period);
                        if (income.isVisible) {
                            category.areAllFiltered = false;
                        }
                    } else {
                        income.isVisible = false;
                    }
                });
            });
        } else {
            this.markAllEntriesVisible();
        }

        return cats;
    }

    constructor(
        private service: CategoriesService,
        private incomeService: IncomeService,
        private expenseService: ExpensesService,
        private route: ActivatedRoute,
        private translate: I18nService,
        private toastService: ToastService,
        private modalService: NgbModal,
        private breakpointObserver: BreakpointObserver,
        private router: Router) {
    }

    ngOnInit(): void {
        this.loadCategories();

        this.breakpointObserver.observe([Breakpoints.XSmall])
            .subscribe(result => {
                this.modeSummary = result.matches;
            });
    }

    loadCategories() {
        const boardId = this.route.snapshot.paramMap.get('id');

        this.spinner = true;

        if (boardId) {
            this.service.getUserCategories(+boardId)
                .pipe(finalize(() => this.spinner = false))
                .subscribe(categories => {
                    this.categories = categories.map(category => {
                        return { ...category, isVisible: true };
                    });

                    this.concatTags();

                    this.markAllEntriesVisible();
                });

        }
    }

    private markAllEntriesVisible(): void {
        this.categories?.forEach(category => {
            category.areAllFiltered = true;

            category.expenses.forEach(expense => {
                expense.isVisible = this.viewExpenses && this.isPeriodActive(expense.period);
                if (expense.isVisible) category.areAllFiltered = false;
            });

            category.incomes.forEach(income => {
                income.isVisible = this.viewIncomes && this.isPeriodActive(income.period);
                if (income.isVisible) category.areAllFiltered = false;
            });
        });
    }

    private isPeriodActive(period: EPeriod) {
        switch (period) {
            case EPeriod.Monthly:
                return this.periods.month;
            case EPeriod.Quarterly:
                return this.periods.quarter;
            case EPeriod.Biannual:
                return this.periods.semester;
            case EPeriod.Annual:
                return this.periods.annual;
        }
    }

    addIncome(income: IncomeResult, category: GetCategoryResult) {
        category.incomes.push(income);
        this.recalcCategory(category);
    }

    addExpense(expense: ExpenseResult, category: GetCategoryResult) {
        category.expenses.push(expense);
        this.recalcCategory(category);
    }

    updateIncome(category: GetCategoryResult, income: IncomeResult, updatedIncome: IncomeResult) {
        Object.assign(income, updatedIncome);
        this.recalcCategory(category);
    }

    updateExpense(category: GetCategoryResult, expense: ExpenseResult, updatedExpense: ExpenseResult) {
        Object.assign(expense, updatedExpense);
        this.recalcCategory(category);
    }

    updateIncomeTags(tags: TagResult[], updatedTags: TagResult[]) {
        tags.splice(0, tags.length, ...updatedTags);
        this.concatTags();
    }

    updateExpenseTags(tags: TagResult[], updatedTags: TagResult[]) {
        tags.splice(0, tags.length, ...updatedTags);
        this.concatTags();
    }

    private concatTags() {
        this.setTags = ([] as TagResult[]).concat(...this.categories.map(category =>
            [...category.expenses, ...category.incomes].flatMap(entry => entry.tags)
        ));

        this.setTags = this.setTags.map(tag => {
            return { ...tag, check: false };
        })
    }

    private recalcCategory(category: GetCategoryResult) {
        const totalExpenses = category.expenses.reduce((total, expense) => total - expense.amount, 0);

        // Calcular el total de los ingresos (incomes)
        const totalIncomes = category.incomes.reduce((total, income) => total + income.amount, 0);

        // Actualizar la propiedad total y isPositive
        category.total = totalIncomes + totalExpenses;
        category.isPositive = category.total >= 0;
        this.categories = [...this.categories];
    }

    deleteCategory(category: GetCategoryResult) {
        const modalRef = this.modalService.open(ConfirmationModalComponent);

        modalRef.componentInstance.confirmMessage = this.translate.translate('seguroQueDeseasEliminarCategoria');
        modalRef.result.then((result) => {
            if (result === 'confirm') {
                category.spinner = true;
                this.service.deleteCategory(category.categoryId)
                    .pipe(finalize(() => category.spinner = false))
                    .subscribe(() => {
                        this.toastService.success(this.translate.translate('seHaEliminadoCorrectamenteCategoria'));
                    });
            }
        });
    }

    deleteIncome(incomeId: number, category: GetCategoryResult) {
        const modalRef = this.modalService.open(ConfirmationModalComponent);

        modalRef.componentInstance.confirmMessage = this.translate.translate('seguroQueDeseasEliminarLaEntrada');
        modalRef.result.then((result) => {
            if (result === 'confirm') {
                this.incomeService.deleteIncome(incomeId)
                    .subscribe(() => {
                        this.toastService.success(this.translate.translate('seHaEliminadoCorrectamenteEntrada'));

                        let index = category.incomes.findIndex(obj => obj.incomeId === incomeId);

                        if (index !== -1) {
                            category.incomes.splice(index, 1);
                        }
                    });
            }
        });
    }

    deleteExpense(expenseId: number, category: GetCategoryResult) {
        const modalRef = this.modalService.open(ConfirmationModalComponent);

        modalRef.componentInstance.confirmMessage = this.translate.translate('seguroQueDeseasEliminarLaEntrada');
        modalRef.result.then((result) => {
            if (result === 'confirm') {
                this.expenseService.deleteExpense(expenseId)
                    .subscribe(() => {
                        this.toastService.success(this.translate.translate('seHaEliminadoCorrectamenteEntrada'));

                        let index = category.expenses.findIndex(obj => obj.expenseId === expenseId);

                        if (index !== -1) {
                            category.expenses.splice(index, 1);
                        }
                    });
            }
        });
    }

    goToCorrectMonth() {
        this.router.navigate(['./correct-month', this.boardId])
    }

    downloadPdf() {
        this.modeSummary = true;
        this.visibleSecondaryEstimates = true;
        this.spinner = true;        

        setTimeout(() => {
            // Extraemos el
            const DATA = document.getElementById('container-board-complete-pdf');
            const doc = new jsPDF('p', 'pt', 'a4');
            const options = {
                background: 'white',
                scale: 3
            };
            if (DATA) {

                html2canvas(DATA, options).then((canvas) => {

                    const img = canvas.toDataURL('image/PNG');

                    // Add image Canvas to PDF
                    const bufferX = 15;
                    const bufferY = 15;
                    const imgProps = (doc as any).getImageProperties(img);
                    const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
                    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
                    doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
                    return doc;
                }).then((docResult) => {
                    docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
                    this.spinner = false;
                    this.modeSummary = false;
                    this.visibleSecondaryEstimates = false;
                });
            }
        }, 1000);
    }
}
