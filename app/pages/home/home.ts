import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { PlacePage } from "../place/place";
import { Categories } from "../../components/categories/categories";
import { DataPoints } from "../../providers/data-points/data-points";

@Component({
  templateUrl: 'build/pages/home/home.html',
  directives: [Categories],
  providers: [DataPoints]
})
export class HomePage  implements OnInit{

  categories:any[] = [];

  constructor(public nav: NavController, private _dp:DataPoints) {
  }

  onGoCat(event:any){
    //console.log('go to categorie-> ', event)
    this.nav.push(PlacePage,{id:event.id, map: event.map})
  }

  ngOnInit(){
    let tmpCat: string[] = [];
    this._dp.load().then(()=>{
      this.categories[0] = this._dp.getcategories()
    })
    .then(()=>{
      this.categories.push([
        'Déchets encombrants',
        'Fer',
        'Appareils éléctriques et éléctroménagers'
      ])
    })
  }
}
