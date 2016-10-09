import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { Ucfirst } from "../../pipes/Ucfirst";
import { MapPage } from "../map/map";
import { FirebaseService } from '../../providers/firebase/firebase';
/*
  Generated class for the PlacePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/place/place.html',
  providers: [
    [FirebaseService]
  ],
  pipes: [Ucfirst]
})
export class PlacePage {

  catTitle:string;
  displayMap:boolean;
  catData:any;
  loader:any;

  constructor(private nav: NavController, private params: NavParams, public _gfb : FirebaseService, public loadingCtrl: LoadingController) {
    const selectedId = params.data.id;
    const haveMap = params.data.map;
    this.loader;
    this.catTitle = selectedId;
    this.displayMap = haveMap;

    if(navigator.onLine == false){
      console.log('disconnected')
    }
    else {
      console.log(this.getURI(this.catTitle).replace(/ /g,"-"))
      this.loadDataPage()

    }
  }
  loadDataPage(){
    //console.log('load page data')
    this.loader = this.loadingCtrl.create({
      content: "Chargement..."
    });
    this.loader.present();

    this._gfb.pages.child(this.getURI(this.catTitle).replace(/ /g,"-")).once('value', (snapshot) => {
      if(snapshot.val() != null){
        this.catData = snapshot.val()
      }
    }).then(()=>{
      this.hideLoading()
    })
  }

  getURI(cat){
    return cat.toLowerCase().replace(/ /g,"-").replace(/é/g,"e").replace(/è/g,"e");
  }
  onGoMap(){
    this.nav.push(MapPage,{id:this.catTitle})
  }

  private hideLoading(){
    this.loader.dismiss();
  }
}
