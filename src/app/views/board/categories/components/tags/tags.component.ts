import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TagResult } from '../../models/get-category.result';
import { TagsService } from '../../services/tags.service';
import { CreateTagCommand } from '../../models/tag/create-tag.command';

@Component({
    selector: 'app-tags',
    templateUrl: './tags.component.html'
})
export class TagsComponent {
    @Input() boardId!: number;
    @Input() expenseId!: number;
    @Input() incomeId!: number;
    @Input() tags!: TagResult[];
    @Output() created = new EventEmitter<TagResult[]>();

    visible = false;
    spinner = false;

    selected!: TagResult[];
    items: TagResult[] = [];

    constructor(private service: TagsService) { }

    openModal() {
        if (!this.visible) {
            if (this.tags != null) {
                this.selected = [];
                this.tags.forEach((tag) => {
                    this.selected.push({ tagId: tag.tagId, name: tag.name } as TagResult);
                });
            }
        } else {
            this.created.emit(this.selected);
        }
        this.visible = !this.visible;
    }

    handleModal = (event: any) => this.visible = event;

    addTagFn(name: string) {
        return { name: name, tag: true };
    }

    add(item: TagResult) {
        const command = {
            name: item.name,
            boardId: this.boardId,
            expenseId: this.expenseId,
            incomeId: this.incomeId
        } as CreateTagCommand;

        this.service.add(command).subscribe(i => {
            const el = this.selected.find(i => i.name === item.name);
            if (el != null) {
                el.tagId = i.tagId;
            }
        });
    }

    remove(item: any) {
        this.service.delete(item.value.tagId).subscribe();
    }
}
