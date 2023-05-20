import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Periods } from './periods';


@Component({
    selector: 'app-view-periods',
    templateUrl: './view-periods.component.html'
})
export class ViewPeriodsComponent {
    @Input() periods!: Periods;

    selected!: number[];

    constructor(private modalService: NgbModal) { }

    open(content: any) {
        this.modalService.open(content).result.then();
    }
}
