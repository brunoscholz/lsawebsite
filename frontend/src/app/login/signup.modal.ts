import { Component, Input, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';

@Component({
  selector: 'signup-modal',
  templateUrl: './signup.modal.html',
  styleUrls: ['./sign.modal.css'],
  exportAs: 'child'
})
export class SignupModalCmp {
   @ViewChild(ModalDirective) public signupModal: ModalDirective;
   @Input() title?:string;

   // @Output for events??

  constructor() {
    //this.hide();
  }

  show() {
    this.signupModal.show();
  }

  hide() {
    this.signupModal.hide();
  }
}