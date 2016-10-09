import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

import * as firebase from 'firebase';
/*
  Generated class for the Firebase provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FirebaseService {

  database: any;
  pages: any;

  constructor(private http: Http) {
    if(navigator.onLine === true){
      this.database = firebase.database();
      this.pages = this.database.ref('/pages');
    }
  }

}
