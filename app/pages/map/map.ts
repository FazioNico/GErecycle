import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { GoogleMap } from "../../components/google-map/google-map";
import { DataPoints } from "../../providers/data-points/data-points";

/*
  Generated class for the MapPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/map/map.html',
  providers: [DataPoints],
  directives: [GoogleMap]
})
export class MapPage {

  title:string;
  geoPoint:any[];
  loader:any;

  constructor(
    private navCtrl: NavController,
    private params: NavParams,
    private _dp:DataPoints,
    public loadingCtrl: LoadingController
  ) {
    const selectedId = params.data.id;
    //console.log(selectedId)
    this.loader;
    this.loader = this.loadingCtrl.create({
      content: "Chargement..."
    });
    this.loader.present();
    this._dp.load().then(()=>{
      if(selectedId){
        this.title = 'Plan: ' + selectedId;
        this.geoPoint = this._dp.getPointByCat(selectedId)
      }
      else {
        this.title = 'Plan';
        this.geoPoint = this._dp.data
      }

    }).then(()=>{
      this.loader.dismiss();
    })
  }

}
