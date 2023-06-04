export interface GetBoardResult {
  boardId: number;
  name?: string;
  description?: string;
  hasPendingCorrection: boolean;
  financialHealthNote: number;

  spinner: boolean;
}
