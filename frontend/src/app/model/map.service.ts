import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { MapConst } from './maps';
import { Location, Geography } from './general';

import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

export interface IMapOptions {
  lat: number;
  lng: number;
  zoom: number;
}

const QUERY_PAUSE = 500;

@Injectable()
export class MapService {
  currentPosition: IMapOptions;
  geocoder: google.maps.Geocoder = null;

  // Observable sources
  private placeSource = new Subject<google.maps.places.PlaceResult>();
  private positionSource = new Subject<IMapOptions>();

  // Observable streams
  public placeAnnounced$ = this.placeSource.asObservable();
  public positionAnnounced$ = this.positionSource.asObservable();

  constructor(private _globalService: GlobalService) {}

  // Service message commands
  public announcePlace(data: google.maps.places.PlaceResult) {
    this.placeSource.next(data);
  }

  public announcePosition(data: IMapOptions) {
    this.positionSource.next(data);
  }
 
  newPlace(data: IMapOptions) {
    /*this._shaftData = obj;
    this.announcePlace(this._shaftData);*/
  }

  public setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        let opt: IMapOptions = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          zoom: 12
        };
        this.announcePosition(opt);
        //this.devPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      });
    }
  }

  public getLocation(place: google.maps.places.PlaceResult) {
    // google.maps.GeocoderResult

    // formatted_address
    // name:"Av. Água Verde, 162"
    // place_id
    // url
    // vicinity:"Água Verde"

    let loc = new Location();
    loc.geography = new Geography();

    loc.formattedAddress = place.formatted_address;
    loc.latitude = place.geometry.location.lat();
    loc.longitude = place.geometry.location.lng();

    var c, lc, component;
    //console.log(place.address_components);
    for (c = 0, lc = place.address_components.length; c < lc; c += 1) {
      component = place.address_components[c];

      if (component.types[0] === 'locality' || component.types[0] === 'administrative_area_level_2') {
        loc.geography.cityName = component.long_name;
        continue;
      }

      if(component.types[0] === 'sublocality_level_1' || component.types[1] === 'sublocality') {
        loc.neighborhood = component.long_name;
        continue;
      }

      if(component.types[0] == 'route') {
        loc.address = component.long_name;
        continue;
      }

      if(component.types[0] == 'street_number') {
        loc.streetNumber = component.long_name;
        continue;
      }

      if(component.types[0] == 'administrative_area_level_1') {
        loc.geography.stateName = component.long_name;
        loc.geography.stateCode = component.short_name;
        continue;
      }

      if(component.types[0] == 'postal_code') {
        loc.postCode = component.long_name; // remove -
        continue;
      }

      if(component.types[0] == 'country') {
        loc.geography.countryName = component.long_name;
        loc.geography.countryCode = component.short_name;
        continue;
      }
    }
    
    return loc;
  }

  public fullAddressForlatLng(lat: number, lng: number): Observable<google.maps.GeocoderResult> {
    if (!this.geocoder) {
      this.geocoder = new google.maps.Geocoder();
    }
    const latlng = new google.maps.LatLng(lat, lng);
    return this.geocode(latlng)
      .debounceTime(QUERY_PAUSE)
      .distinctUntilChanged()
      .map(res => res)
      .retry(3);
  }

  /***
   * Convert coordinates to address
   * @param lat
   * @param lng
   * @returns {Observable}
   */
  public addressForlatLng(lat: number, lng: number): Observable<string> {
    if (!this.geocoder) {
      this.geocoder = new google.maps.Geocoder();
    }
    const latlng = new google.maps.LatLng(lat, lng);
    return this.geocode(latlng)
      .debounceTime(QUERY_PAUSE)
      .distinctUntilChanged()
      .map(res => res.formatted_address)
      .retry(3);
  }

  private geocode(latlng: google.maps.LatLng): Observable<any> {
    return new Observable((sub: any) => {
      this.geocoder.geocode({location: latlng}, (result: google.maps.GeocoderResult[], status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          sub.next(result[0]);
          sub.complete();
        } else if (status === google.maps.GeocoderStatus.ZERO_RESULTS) {
          sub.error({
            type: 'ZERO',
            message: `Zero results for geocoding location: ${location}`
          });
        } else if (status === google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
          sub.error({
            type: 'OVER_QUERY_LIMIT',
            message: `OVER_QUERY_LIMIT. location: ${location}`
          });
        } else if (status === google.maps.GeocoderStatus.REQUEST_DENIED) {
          sub.error({
            type: 'DENIED',
            message: `Request denied for geocoding location: ${location}`
          });
        } else {
          sub.error({
            type: 'INVALID',
            message: `Invalid request for geocoding: status: ${status}, location: ${location}`
          });
        }
      });
    });
  }

  private handleError(error: Response | any) {

    let errorMessage: any = {};
    // Connection error
    if (error.status == 0) {
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
}