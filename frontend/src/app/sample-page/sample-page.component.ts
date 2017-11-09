import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-sample-page',
    templateUrl: './sample-page.component.html',
})
export class SamplePageComponent implements OnInit {
    _id:number;
    _parameters:any;

    constructor(public _activatedRoute:ActivatedRoute) {
    }

    ngOnInit() {
        this._parameters = this._activatedRoute.params.subscribe(params => {
            if(typeof params['id'] !== "undefined") {
                this._id = Number.parseInt(params['id']);
            } else {
                // do something here
            }
        });
    }


}
