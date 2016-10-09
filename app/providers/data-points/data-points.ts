import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { dbPoints } from "./data-points-json";
/*
  Generated class for the DataPoints provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DataPoints {

  data:any;
  categories:string[] = [];

  constructor(private http: Http) {
    this.data = null;
  }

  load() {
    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }
    // don't have the data yet
    return new Promise(resolve => {
          this.data = dbPoints;
          resolve(this.data);
    });
  }
  getcategories(){
    this.data.map((data) => {
      data.categories.map((cat)=>{
        if(this.categories.indexOf(cat) === -1){
          this.categories.push(cat)
        }
      })
    })
    return this.categories
  }

  getPointByCat(cat:string){
    let result = [];
    this.data.map((geoPointData)=>{
        geoPointData.categories.map((dataCat)=>{
          if (dataCat === cat){
            result.push(geoPointData)
          }
        })
    })
    return result;
  }
}
