export interface SimulateGoalResult {
    message: string;
    dateEstimated: string | null;
    amountReserved: number | null;
    isPossibleCreateGoal: boolean;
    numMonths: number;

    error:boolean;
    errorMessage:string;
}