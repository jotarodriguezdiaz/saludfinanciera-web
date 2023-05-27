export interface CreateGoalCommand {
    boardId: number;
    userId: string;

    description: string;
    cost: number;
    percentageAssigned: number;

    dateEstimated: string;
    amountReserved: number;
    message: string;
    mumMonths: number;
}