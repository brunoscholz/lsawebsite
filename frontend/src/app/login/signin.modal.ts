import { Component, Input, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';

@Component({
  selector: 'signin-modal',
  templateUrl: './signin.modal.html',
  styleUrls: ['./sign.modal.css'],
  exportAs: 'child'
})
export class SigninModalCmp {
   @ViewChild(ModalDirective) public signinModal: ModalDirective;
   @Input() title?:string;

   // @Output for events??

  constructor() {
    //this.hide();
  }

  show() {
    this.signinModal.show();
  }

  hide() {
    this.signinModal.hide();
  }
}