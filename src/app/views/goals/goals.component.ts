import { Component, OnInit } from '@angular/core';
import { GoalsService } from './services/goals.service';
import { GetGoalsResult } from './models';
import { BoardService } from '../boards/services';
import { GetBoardResult } from '../boards/models';
import { finalize } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirm-modal/confirmation-modal.component';
import { ToastService } from 'src/app/core/toast/toast.service';
import { I18nService } from 'src/app/core/i18n/i18n.service';

@Component({
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss']
})
export class GoalsComponent implements OnInit {
  spinner = false;
  spinnerGoals = false;

  boards: GetBoardResult[] = [];
  goals: GetGoalsResult[] = [];

  selectedBoard: GetBoardResult | null = null;

  get canCreateGoal(): boolean {
    return this.selectedBoard !== null && this.selectedBoard.hasAnyCorrectedMonth;
  }

  constructor(
    public service: GoalsService,
    public boardService: BoardService,
    private modalService: NgbModal,
    private toastService: ToastService,
    private translate: I18nService) { }

  ngOnInit(): void {
    this.loadBoards();
  }

  private loadBoards() {
    this.spinner = true;
    this.boardService.getUserBoards()
      .pipe(finalize(() => this.spinner = false))
      .subscribe(boards => this.boards = boards)
  }

  loadGoals() {
    if (!this.canCreateGoal) return;

    this.spinnerGoals = true;
    this.service.getUserBoards(this.selectedBoard!.boardId)
      .pipe(finalize(() => this.spinnerGoals = false))
      .subscribe(
        (response: GetGoalsResult[]) => {
          this.goals = response;
        }
      );
  }


  deleteGoal(goal: GetGoalsResult): void {
    const modalRef = this.modalService.open(ConfirmationModalComponent);

    modalRef.componentInstance.confirmMessage = this.translate.translate('seguroQueDeseasEliminarGoal');
    modalRef.result.then((result) => {
      if (result === 'confirm') {
        goal.spinner = true;
        this.service.deleteGoal(goal.goalId)
          .pipe(finalize(() => goal.spinner = false))
          .subscribe(() => {
            this.toastService.success(this.translate.translate('seHaEliminadoCorrectamente'));
            this.loadGoals();
          });
      }
    });
  }
}
