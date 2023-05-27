export interface GetGoalResult {
    goalId: number;
    boardId: number;
    description: string;
    cost: number;
    percentageAssigned: number;
    dateEstimated: string;
    amountReserved: number;    
}