import {Injectable} from '@angular/core';
import * as moment from "moment";
import {environment} from '../../environments/environment';


@Injectable()
export class GlobalService{
    public apiHost:string;

    public setting:any = {};

    constructor(){
        if(environment.production == true) {
            this.apiHost = 'http://api.booking.com.au/v1';
        } else {
            this.apiHost = 'http://api.booking.com.au/v1';
        }
    }

    loadGlobalSettingsFromLocalStorage():void{
        if(localStorage.getItem('backend-setting') != null){
            this.setting = JSON.parse(localStorage.getItem('backend-setting'));
        }

    }
}