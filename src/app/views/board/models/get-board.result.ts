export interface GetBoardResult {
  boardId: number;
  name?: string;
  description?: string;
  hasPendingCorrection: boolean;

  spinner: boolean;
}
