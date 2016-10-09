import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Ucfirst } from "../../pipes/Ucfirst";
/*
  Generated class for the Categories component.

  See https://angular.io/docs/ts/latest/api/core/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'categories',
  templateUrl: 'build/components/categories/categories.html',
  pipes: [Ucfirst]
})
export class Categories {

  @Input() dataInput: any[];
  @Output() goCat: EventEmitter<any> = new EventEmitter();

  constructor() {

  }
  getImgURL(cat){
    return cat.toLowerCase().replace(/ /g,"-").replace(/é/g,"e").replace(/è/g,"e");
  }
  onGoCat(event:any,cat:string,geoPoints:any){
    let displayMap = true;
    if(!geoPoints){
      displayMap = false;
    }
    //console.log(displayMap)
    this.goCat.emit({ event:event, id: cat, map : displayMap})
  }
}
