export interface CreateGoalResult {
    goalId: number;
    boardId: number;

    description: string;
    cost: number;
    percentageAssigned: number;

    dateEstimated: string;
    amountReserved: number;
    message: string;
    numMonths: number;
}