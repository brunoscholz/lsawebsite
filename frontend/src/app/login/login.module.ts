import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalModule } from 'ngx-bootstrap/modal';
import { SignModalCmp } from './sign.modal';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginPage } from './login.page';

import { LoginComponent } from './login.component';
import { SignupComponent } from './signup.component';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
    imports: [
        CommonModule,
        ModalModule,
        FormsModule,
        LoginRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [
        LoginPage,
        LoginComponent,
        SignupComponent,
        SignModalCmp,
    ],
    exports: [
        LoginPage,
    	LoginComponent,
        SignupComponent,
    	SignModalCmp,
    ]
})
export class LoginModule {
}
