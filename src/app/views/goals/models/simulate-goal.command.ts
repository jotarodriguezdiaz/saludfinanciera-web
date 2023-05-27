export interface SimulateGoalCommand {
    boardId: number;
    goalId: number | null;
    percentageAssigned: number;
    cost: number;
}