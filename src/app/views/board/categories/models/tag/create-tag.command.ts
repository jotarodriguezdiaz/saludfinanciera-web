export interface CreateTagCommand {
    name: string;
    boardId: number;
    expenseId: number | null;
    incomeId: number | null;
}