export interface GetGoalsResult {
    goalId: number;
    createdDate: string;

    description: string;
    cost: number;
    percentageAssigned: number;

    dateEstimated: string;
    amountReserved: number;
    message: string;

    completionPercentage: number;

    spinner: boolean;
}