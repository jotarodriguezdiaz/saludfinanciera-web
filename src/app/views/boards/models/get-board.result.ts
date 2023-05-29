export interface GetBoardResult {
  boardId: number;
  name?: string;
  description?: string;
  hasAnyCorrectedMonth: boolean;
  hasPendingCorrection: boolean;

  spinner: boolean;
}
