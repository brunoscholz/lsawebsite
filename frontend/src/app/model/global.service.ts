import {Injectable} from '@angular/core';
import * as moment from "moment";
import {environment} from '../../environments/environment';


@Injectable()
export class GlobalService{
    public apiHost:string;
    public backendHost:string;
    public frontendHost:string;

    public setting:any = {};

    constructor(){
        if(environment.production == true) {
            this.apiHost = 'http://api.bookingaus.tk/v1';
            this.backendHost = 'http://admin.bookingaus.tk';
            this.frontendHost = 'http://www.bookingaus.tk';
        } else {
            this.apiHost = 'http://api.booking.com.au/v1';
            this.backendHost = 'http://localhost:4200';
            this.frontendHost = 'http://localhost:4201';
        }
    }

    loadGlobalSettingsFromSessionStorage():void{
        if(sessionStorage.getItem('frontend-setting') != null){
            this.setting = JSON.parse(sessionStorage.getItem('frontend-setting'));
        }

    }
}