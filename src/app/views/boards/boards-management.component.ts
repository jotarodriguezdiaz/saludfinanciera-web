import { Component } from '@angular/core';
import { BoardService } from './services';
import { GetBoardResult } from './models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirm-modal/confirmation-modal.component';
import { finalize } from 'rxjs';
import { ToastService } from 'src/app/core/toast/toast.service';
import { I18nService } from 'src/app/core/i18n/i18n.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth';

@Component({
  templateUrl: './boards-management.component.html',
  styleUrls: ['./boards-management.component.scss']
})
export class BoardsManagementComponent {
  boards: GetBoardResult[] = [];
  selectedBoard!: GetBoardResult; // Agregar esta línea
  spinnerCreateTemplate = false;

  spinner = false;

  public visibleCreate = false;

  openModalCreate = () => this.visibleCreate = !this.visibleCreate;

  handleCreateChange = (event: any) => this.visibleCreate = event;

  constructor(
    private boardService: BoardService,
    private modalService: NgbModal,
    private toastService: ToastService,
    private translate: I18nService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      if (this.router.routerState.snapshot.url === '/') {
        this.router.navigate(['./boards']);
      } else {
        this.loadBoards();
      }
    } else {
      this.router.navigate(['./login']);
    }
  }

  loadBoards(): void {
    this.spinner = true;
    this.boardService.getUserBoards()
      .pipe(
        finalize(() => this.spinner = false)
      )
      .subscribe((boards) => {
        this.boards = boards;
      });
  }

  deleteBoard(board: GetBoardResult): void {
    const modalRef = this.modalService.open(ConfirmationModalComponent);

    modalRef.componentInstance.confirmMessage = this.translate.translate('seguroQueDeseasEliminarBoard');
    modalRef.result.then((result) => {
      if (result === 'confirm') {
        board.spinner = true;
        this.boardService.deleteBoard(board.boardId)
          .pipe(finalize(() => board.spinner = false))
          .subscribe(() => {
            this.toastService.success(this.translate.translate('seHaEliminadoCorrectamente'));
            this.loadBoards();
          });
      }
    });
  }

  go = (board: GetBoardResult) => this.router.navigate(['./board', board.boardId]);

  createTemplate(templateNumber: number) {
    this.boardService.createTemplate(templateNumber)
      .subscribe(() => this.loadBoards());
  }

}
