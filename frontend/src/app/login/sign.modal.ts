import { Component, Input, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';

@Component({
  selector: 'sign-modal',
  templateUrl: './sign.modal.html',
  styleUrls: ['./sign.modal.css'],
  exportAs: 'child'
})
export class SignModalCmp {
   @ViewChild(ModalDirective) public modal: ModalDirective;
   @Input() title?:string;
   @Input() size?:string = 'md';

   // @Output for events??

  constructor() {
    //this.hide();
  }

  show() {
    this.modal.show();
  }

  hide() {
    this.modal.hide();
  }
}