import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { IModal } from '../../interfaces/modal.interface';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
    @ViewChild('modal', { static: true }) modal: any;

    @Input() paragraph: Array<IModal>;

    @Output() save: EventEmitter<number> = new EventEmitter<number>();

    constructor() { }

    ngOnInit(): void { }

    onSave(id: number) {
        this.save.emit(id);
        this.closeModal();
    }

    openModal() {
        this.modal.open();
    }

    closeModal() {
        this.modal.close();
    }
}
