import { Component } from '@angular/core';
import { Platform, ionicBootstrap } from 'ionic-angular';
import { Http, HTTP_PROVIDERS }     from '@angular/http';
import { StatusBar } from 'ionic-native';
import { TabsPage } from './pages/tabs/tabs';

import { DataPoints } from "./providers/data-points/data-points";
import * as firebase from 'firebase';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [DataPoints]
})
export class MyApp {

  public rootPage: any;

  constructor(private platform: Platform) {
    const CONFIG_GFB = {
      apiKey: "AIzaSyCa6MShEZFOj1Dj36dzLffA7oQy02usy94",
      authDomain: "plexiform-style-144411.firebaseapp.com",
      databaseURL: "https://plexiform-style-144411.firebaseio.com",
      storageBucket: "plexiform-style-144411.appspot.com",
      messagingSenderId: "372571974454"
    };
    this.rootPage = TabsPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      if(navigator.onLine == false){
        console.log('disconnected')
      }
      else {
        firebase.initializeApp(CONFIG_GFB);
      }
      StatusBar.show();
      StatusBar.overlaysWebView(false);
      StatusBar.styleLightContent();
      StatusBar.backgroundColorByHexString("#0285c1");
    });
  }
}
ionicBootstrap(MyApp, [ HTTP_PROVIDERS ],{
    mode: 'md',
    tabbarPlacement: 'top',
    prodMode: true
});
