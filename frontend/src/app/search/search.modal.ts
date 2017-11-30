import { Component, Input, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';

@Component({
  selector: 'search-modal',
  templateUrl: './search.modal.html',
  styleUrls: ['./search.modal.css'],
  exportAs: 'child'
})
export class SearchModalCmp {
   @ViewChild(ModalDirective) public searchModal: ModalDirective;
   @Input() title?:string;

   // @Output for events??

  constructor() {
  }

  show() {
    this.searchModal.show();
  }

  hide() {
    this.searchModal.hide();
  }
}