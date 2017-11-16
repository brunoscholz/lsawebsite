import { Component, ElementRef, NgZone, ViewChild, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

import { MapService, IMapOptions } from '../model/map.service';
import { Location } from '../model/general';

import * as moment from "moment";
import * as _ from "underscore";

@Component({
  selector: 'google-map',
  templateUrl: './map.component.html',
  styles: [`
    agm-map {
      height: 600px;
    }
  `],
})
export class MapComponent implements OnInit, OnDestroy {
  @Output() change:EventEmitter<Location> = new EventEmitter<Location>();

  googleMarkers : any;
  public latitude: number;
  public longitude: number;
  public zoom: number;

  public searchControl: FormControl;

   markers: marker[] = [
    {
      lat: 51.673858,
      lng: 7.815982,
      label: 'Browns',
      icon: '/assets/img/marker.png'
    },
    {
      lat: 51.373858,
      lng: 7.215982,
      label: 'State U',
      icon: '/assets/img/marker.png'
    },
    {
      lat: 51.723858,
      lng: 7.895982,
      label: 'State2 U',
      icon: '/assets/img/marker.png'
    }
  ];

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private mapService: MapService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    //set google maps defaults
    this.zoom = 6;
    this.latitude = -27.4698;
    this.longitude = 153.0251;

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      /*let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });*/


      //this.googleMarkers = this.initMarkers();
      /*let marker1 = new google.maps.Marker();*/
    });
  }

  initMarkers() {
    let i = 0;
    let markers = this.markers;
    var result = [];
    for ( ; i < markers.length; ++i ){
       result.push( new google.maps.Marker({
            position : markers[ i ] 
        })
       );
    }
    return result;
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        /*this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;*/
        this.latitude = -27.4698;
        this.longitude = 153.0251;
        this.zoom = 8;
      });
    }
  }

  ngOnDestroy() {}
}

interface marker {
  lat: number;
  lng: number;
  label?: string;
  icon?: string;
}