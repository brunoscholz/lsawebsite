import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalModule } from 'ngx-bootstrap/modal';
import { SignModalCmp } from './sign.modal';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { SignupComponent } from './signup.component';
//import { LoginRoutingModule } from './login-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ModalModule,
        ReactiveFormsModule
    ],
    declarations: [
        LoginComponent,
        SignupComponent,
        SignModalCmp,
    ],
    exports: [
    	LoginComponent,
        SignupComponent,
    	SignModalCmp,
    ]
})
export class LoginModule {
}
