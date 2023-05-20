import { EPeriod } from "../../../../../shared/enums/period.enum";

export interface CreateIncomeCommand {
    categoryId: number;
    userId: string;
    amount: number;
    name: string | null;
    description: string | null;
    period: EPeriod;
}