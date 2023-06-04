export interface GetBoardResult {
  boardId: number;
  name?: string;
  description?: string;
  hasAnyCorrectedMonth: boolean;
  hasPendingCorrection: boolean;

  // Nota financiera
  age: number;
  richness: number;
  percentageMonthlyInvestment: number;
  savingPercentage: number;
  passive: number;
  financialHealthNote: number;

  spinner: boolean;
}
