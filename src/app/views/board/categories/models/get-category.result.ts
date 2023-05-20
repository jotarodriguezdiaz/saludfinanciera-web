import { ERelevance } from '../../../../shared/enums/relevance.enum';
import { EPeriod } from '../../../../shared/enums/period.enum';

export interface GetCategoryResult {
    categoryId: number;
    name: string | null;
    description: string | null;
    expenses: ExpenseResult[];
    incomes: IncomeResult[];
    total: number;
    isPositive: boolean;

    spinner: boolean;
    isVisible: boolean;
    areAllFiltered: boolean;
}

export interface EntryResult {
    position: number;
    name: string | null;
    description: string | null;
    amount: number;
    period: EPeriod;
    tags: TagResult[];  

    isVisible: boolean;
}

export interface ExpenseResult extends EntryResult {
    expenseId: number;
    expendable: boolean;
    variable: boolean;
    relevance: ERelevance;
}

export interface IncomeResult extends EntryResult {
    incomeId: number;
}

export interface TagResult {
    tagId: number;
    name: string | null;

    check: boolean;
}