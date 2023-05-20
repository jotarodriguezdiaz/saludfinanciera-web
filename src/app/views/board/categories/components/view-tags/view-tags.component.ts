import { Component, Input } from '@angular/core';
import { TagResult } from '../../models/get-category.result';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'app-view-tags',
    templateUrl: './view-tags.component.html'
})
export class ViewTagsComponent {
    @Input() tags!: TagResult[];

    selected!: number[];
    
    constructor(private modalService: NgbModal) { }

    open(content: any) {
        this.modalService.open(content).result.then();

        this.selected = [];
        this.tags
            .filter(i => i.check === true)
            .forEach((tag) => {
                this.selected.push(tag.tagId);
            });
    }
    
    add(tag: TagResult) {
        const el = this.tags.find(i => i.tagId === tag.tagId);
        if (el) {
            el.check = true;
        }
    }

    remove(item: any) {
        const el = this.tags.find(i => i.tagId === item.value.tagId);
        if (el) {
            el.check = false;
        }
    }
}
