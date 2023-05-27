export interface UpdateGoalCommand {
    goalId: number;

    description: string;
    cost: number;
    percentageAssigned: number;
    dateEstimated: string;
    amountReserved: number;
}