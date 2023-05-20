import { EPeriod } from "../../../../../shared/enums/period.enum";

export interface UpdateIncomeCommand {
    incomeId: number;
    userId: string;
    amount: number;
    name: string | null;
    description: string | null;
    period: EPeriod;
}