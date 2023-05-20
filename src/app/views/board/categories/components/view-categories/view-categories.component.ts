import { Component, Input } from '@angular/core';
import { GetCategoryResult } from '../../models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'app-view-categories',
    templateUrl: './view-categories.component.html'
})
export class ViewCategoriesComponent {
    @Input() categories!: GetCategoryResult[];

    selected!: number[];

    constructor(private modalService: NgbModal) { }


    open(content: any) {
        this.modalService.open(content).result.then();

        this.selected = [];
        this.categories
            .filter(i => i.isVisible === true)
            .forEach((category) => {
                this.selected.push(category.categoryId);
            });
    }

    add(category: GetCategoryResult) {
        const cat = this.categories.find(i => i.categoryId === category.categoryId);
        if (cat) {
            cat.isVisible = true;
        }
    }

    remove(item: any) {
        const cat = this.categories.find(i => i.categoryId === item.value.categoryId);
        if (cat) {
            cat.isVisible = false;
        }
        return;
    }


}
