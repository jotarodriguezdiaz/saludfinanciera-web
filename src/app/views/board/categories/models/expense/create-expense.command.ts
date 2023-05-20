import { EPeriod } from "../../../../../shared/enums/period.enum";
import { ERelevance } from "../../../../../shared/enums/relevance.enum";

export interface CreateExpenseCommand {
    categoryId: number;
    userId: string;
    amount: number;
    name: string | null;
    description: string | null;
    expendable: boolean;
    variable: boolean;
    period: EPeriod;
    relevance: ERelevance;
}