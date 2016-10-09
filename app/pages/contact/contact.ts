import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MapPage } from "../map/map";

@Component({
  templateUrl: 'build/pages/contact/contact.html'
})
export class ContactPage {
  constructor(public nav: NavController) {
  }

  onGoMap(){
    this.nav.push(MapPage,{id:'espaces de recuperation cantonaux'})
  }
}
