import { Component, Input, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';

@Component({
  selector: 'sign-modal',
  templateUrl: './sign.modal.html',
  styleUrls: ['./sign.modal.css'],
  exportAs: 'child'
})
export class SignModalCmp {
   @ViewChild(ModalDirective) public signModal: ModalDirective;
   @Input() title?:string;

   // @Output for events??

  constructor() {
  }

  show() {
    this.signModal.show();
  }

  hide() {
    this.signModal.hide();
  }
}