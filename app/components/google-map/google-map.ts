import { Component, ElementRef, Input, ViewChild } from '@angular/core';

declare var google;
/*
  Generated class for the GoogleMap component.

  See https://angular.io/docs/ts/latest/api/core/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'google-map',
  templateUrl: 'build/components/google-map/google-map.html'
})
export class GoogleMap{

  map: any;
  mapInitialised: boolean = false;
  apiKey: any = 'AIzaSyBbO-2oFCNKpUN5YG300y89Q5Kr3VwGek8';

  @Input() dataInput: any;
  @ViewChild('map') mapElement: ElementRef;

  constructor() {
    this.loadGoogleMaps()
  }

  loadGoogleMaps(){
     this.addConnectivityListeners();
     if(typeof google == "undefined" || typeof google.maps == "undefined"){
       //console.log("Google maps JavaScript needs to be loaded.");
       this.disableMap();

       if(navigator.onLine === true){
         //console.log("online, loading map");
         //Load the SDK
         window['mapInit'] = () => {
           this.initMap();
           this.enableMap();
         }
         let script = document.createElement("script");
         script.id = "googleMaps";
         if(this.apiKey){
           script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
         } else {
           script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
         }
         document.body.appendChild(script);
       }
     }
     else {
       if(navigator.onLine === true){
         //console.log("showing map");
         this.initMap();
         this.enableMap();
       }
       else {
         //console.log("disabling map");
         this.disableMap();
       }
     }
   }
   addConnectivityListeners(){
      var onOnline = () => {
        setTimeout(() => {
          if(typeof google == "undefined" || typeof google.maps == "undefined"){
            this.loadGoogleMaps();
          }
          else {
            if(!this.mapInitialised){
              this.initMap();
            }
            this.enableMap();
          }
        }, 2000);
      };
      var onOffline = () => {
        this.disableMap();
      };
      document.addEventListener('online', onOnline, false);
      document.addEventListener('offline', onOffline, false);
  }

  initMap(){
    this.mapInitialised = true;
    let myOptions = {
        zoom: 13,
        center: new google.maps.LatLng(46.20,6.14),
        mapTypeId: 'roadmap',
        disableDefaultUI: true
    };
    setTimeout(()=>{
      this.map = new google.maps.Map(this.mapElement.nativeElement, myOptions);
      this.dataInput.map((geoPoint)=>{
        let marker = new google.maps.Marker({
            position: {lat:geoPoint.lat, lng: geoPoint.lng},
            map: this.map,
            title: 'Point de récupération'
        });
        //// add event to display details on each markers
        //// get img categories : $imgCat
        let imgCat:string[]=[];
        geoPoint.categories.map((cat)=>{
          imgCat.push(`<img class="thumbPictoIMG" src="./build/img/picto-recycle/${cat.toLowerCase().replace(/ /g,"-").replace(/é/g,"e").replace(/è/g,"e")}.jpg" />`)
        })
        let markerContent = `
          <p><strong>Point de récupération</strong>
            <br/>
            ${geoPoint.label.split('-')[1].replace(/<br \/>/g," ")}
          </p>
          <p>
            ${imgCat.join().replace(/,/g," ")}
          </p>
        `;
        let infowindow = new google.maps.InfoWindow({
          content: markerContent
        });
        marker.addListener('click', function() {
          infowindow.open(this.map, marker);
        });

      })
    },100)

  }

  disableMap(){
   //console.log("disable map");
  }

  enableMap(){
   //console.log("enable map");
  }

}
