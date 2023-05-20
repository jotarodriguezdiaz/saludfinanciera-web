import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { BoardService } from '../boards/services';
import { GetBoardResult } from '../boards/models';

@Component({
    templateUrl: './board.component.html',
    styleUrls:['./board.component.scss']
})
export class BoardComponent implements OnInit {
    spinner = false;
    board!: GetBoardResult;

    constructor(
        private service: BoardService,
        private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.loadBoard();
    }

    private loadBoard() {
        const boardId = this.route.snapshot.paramMap.get('id');

        this.spinner = true;

        if (boardId) {
            this.service.getBoard(+boardId)
                .pipe(finalize(() => this.spinner = false))
                .subscribe(board => this.board = board);
        }
    }
}
