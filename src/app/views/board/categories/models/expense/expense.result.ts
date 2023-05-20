import { EPeriod } from "../../../../../shared/enums/period.enum";
import { ERelevance } from "../../../../../shared/enums/relevance.enum";

export interface ExpenseResult {
    expenseId: number;
    position: number;
    name: string;
    description: string;
    amount: number;
    categoryId: number;
    expendable: boolean;
    variable: boolean;
    period: EPeriod;
    relevance: ERelevance;
}