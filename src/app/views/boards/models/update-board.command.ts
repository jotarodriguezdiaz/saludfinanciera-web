export interface UpdateBoardCommand {
  name?: string;
  description?: string;
  savingPercentage: number;
  boardId: number;
}