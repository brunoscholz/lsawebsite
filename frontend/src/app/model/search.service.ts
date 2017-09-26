import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

import { GlobalService } from './global.service';
import { UserService } from './user.service';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class SearchService {

    constructor(private _globalService:GlobalService,
                private _userService: UserService,
                private _authHttp: AuthHttp) {
    }

    private getHeaders():Headers {
        return new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+this._userService.getToken(),
        });
    }

    // GET /v1/setting
    search(term): Observable<Array<any>> {
        let headers = this.getHeaders();

        return this._authHttp.get(
            this._globalService.apiHost+'/search?q=' + term,
            {
                headers: headers
            }
        )
            .map(response => response.json())
            .map((response) => {
                return <Array<any>>response.data;
            })
            .catch(this.handleError);
    }

    private handleError (error: Response | any) {
        let errorMessage:any = {};

        // Connection error
        if(error.status == 0) {
            errorMessage = {
                success: false,
                status: 0,
                data: "Sorry, there was a connection error occurred. Please try again.",
            };
        }
        else {
            errorMessage = error.json();
        }
        return Observable.throw(errorMessage);
    }

    public static getMetaTypes():Array<any>{
        return [
            {
                label: 'Select',
                value: 'select'
            },
            {
                label: 'Number',
                value: 'number'
            },
            {
                label: 'Text',
                value: 'text'
            }
        ];
    }

    public static getIsPublicTypes():Array<any>{
        return [
            {
                label: 'Public',
                value: 1
            },
            {
                label: 'Private',
                value: 0
            }
        ];
    }
}
