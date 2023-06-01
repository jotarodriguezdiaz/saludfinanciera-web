import { Amortization } from "./amortization";
import { SavingYear } from './saving-year';

export interface Loan {
    import: number;
    typeInterest: number;
    time: number;
    tableAmortization: Amortization[];
    tableSavings: SavingYear[];
}