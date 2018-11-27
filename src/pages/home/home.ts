import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, ModalController, LoadingController } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';
import { Device } from '@ionic-native/device';
import { ZonaProvider } from '../../providers/zona/zona';
import { Storage } from '@ionic/storage';
import { DirectionPage } from '../direction/direction';



declare var google: any;


//serial: this.device.uuid,
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [
    Geolocation,
    Device,
    ZonaProvider
  ]

})
export class HomePage {
  @ViewChild('map') mapEl: ElementRef;
  map: any;

  myMarker: any;
  myLoc: any;

  inZone: any;

  arrayZones: any;
  zonasMarker: any;

  atual: any;

  results: any;


  constructor(
    public navCtrl: NavController,
    public geolocation: Geolocation,
    public device: Device,
    public zona: ZonaProvider,
    public db: Storage,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController
    ) {
      this.inZone = false;
      this.zonasMarker = [];
      this.results = [];
  }


  ionViewDidLoad() {

    // let dataTest = {
    //   latOrigin: -8.016260,
    //   lngOrigin: -34.884960,
    //   latDestination: -8.060184,
    //   lngDestination: -34.9292102

    // }
    
    // this.getDistanceFromLatLonInKm(dataTest.latOrigin, dataTest.lngOrigin, dataTest.latDestination, dataTest.lngDestination)
    //     .then( result => {
    //       console.log(parseInt( result.toString() ) )
    //     })


    //this.getZones();
    this.findMyLoc();
  }

  findMyLoc() {

    // let loadingRoute = this.loadingCtrl.create({ content: 'Consultando vagas disponíveis.' });
    //     loadingRoute.present();


    this.geolocation.getCurrentPosition().then(position =>{
      this.myLoc = {lat: position.coords.latitude, lng: position.coords.longitude};
      
      //this.myMarker.setPosition(this.myLoc);
     //this.map.setZoom(18);
      this.initMap()
      this.getZones()
    })

    let watch = this.geolocation.watchPosition();
        watch.subscribe((data) => {

        let myData = {
          accuracy:         data.coords.accuracy,  /// precisão
          altitude:         data.coords.altitude, /// metros em relação ao nível do mar
          altitudeAccuracy: data.coords.altitudeAccuracy, // precisão do nível do mar
          heading:          data.coords.heading,  /// direção em graus para onde esta indo
          latitude:         data.coords.latitude, 
          longitude:        data.coords.longitude,
          speed:            data.coords.speed  /// velocidade
        }

        this.myLoc = { lat: data.coords.latitude, lng: data.coords.longitude }
        //this.getDistanceFromLatLonInKm(1,2,3,4);


        this.checkInZone();
        //this.myDataLocation(myData)
        });
  }

  // myDataLocation(data) {
  //   console.log(data)
  // }


  initMap() {
    //loadingRoute.dismiss()
    if(this.map == undefined){
     
      let mapOptions = {
        center:  this.myLoc,
        zoom: 17,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true,
        clickableIcons: false
      };

      this.map = new google.maps.Map(this.mapEl.nativeElement, mapOptions);
      this.map.setCenter(this.myLoc);
      this.myMarker = new google.maps.Marker();
      //this.myMarker.setPosition( this.myLoc )
      this.myMarker.setOptions({
        position: this.myLoc,
        map: this.map,
        draggable: false,
        animation: google.maps.Animation.DROP,
        icon: {
          url: "assets/icon/carrobolado.png",
          scaledSize: new google.maps.Size(50, 50)
        },
      });
           
    }else{
      this.map.setZoom(17);
      this.map.setCenter(this.myLoc);
    }
  }

  getZones() {
    this.zona.getZones()
        .then( (result:any) => {

          this.arrayZones = result.zonas;

          let level = [
            { icon: 'assets/icon/high.png', color: '#FF4032' },
            { icon: 'assets/icon/medium.png', color: '#E8E410' },
            { icon: 'assets/icon/low.png', color: '#82FF55' }
          ];

          for (let i = 0; i < this.arrayZones.length; i++) {
            let rand = Math.floor((Math.random() * 3) );

            // let icon;

            // let h = this.arrayZones[i].qtdVagasAtual >= this.arrayZones[i].qtdVagasMax
            // if(h) icon = level[0];

            // let m = (this.arrayZones[i].qtdVagasMax - this.arrayZones[i].qtdVagasAtual) 
            // if(m) icon = level[1];

            // let l = (this.arrayZones[i].qtdVagasMax - this.arrayZones[i].qtdVagasAtual) == this.arrayZones[i].qtdVagasMax;
            // if(l) icon = level[2];


            // console.log(this.arrayZones[i].qtdVagasAtual, this.arrayZones[i].qtdVagasMax)
            // console.log(h,l)

            
            // this.zonasMarker.push(new google.maps.Marker({
            //     position: new google.maps.LatLng(this.arrayZones[i].latitude, this.arrayZones[i].longitude),
            //     //position: new google.maps.LatLng(this.proximos[i].location.locate[1], this.proximos[i].location.locate[0]),
            //     map: this.map,
            //     graus: 40,
            //     // icon: {
            //     //   url:  level[Math.floor((Math.random() * 3) )].icon,
            //     //   scaledSize: new google.maps.Size(30,30)
            //     // }
            //   })
            // )
              
              
              new google.maps.Circle({
                strokeColor: level[rand].color,
                strokeOpacity: 0.8,
                strokeWeight: 0,
                fillColor: level[rand].color,
                fillOpacity: 0.35,
                map: this.map,
                center: new google.maps.LatLng(this.arrayZones[i].latitude, this.arrayZones[i].longitude),
                radius:  parseInt(this.arrayZones[i].radius)
              });
          }
        

          // let markers = this.arrayZones.map((location) => {
          //   return new google.maps.Marker({
          //       position: new google.maps.LatLng(location.latitude, location.longitude)
          //   });
          // });

          // new MarkerClusterer(this.map, markers);

          this.checkInZone();
        })
  }

  checkInZone() {

    if(this.arrayZones) {

      console.log(this.myLoc)
      this.results = [];
      this.arrayZones.forEach(element => {
        this.getDistanceFromLatLonInKm(this.myLoc.lat, this.myLoc.lng, element.latitude, element.longitude)
          .then( result => {
            let distance  = result;
            this.results.push( {distance, ...element} ) 
          })
      });

      setTimeout( () => {
          let last1 = this.results.reduce((min, p) => p.distance < min.distance ? p : min, this.results[0]);

          this.atual = last1;
          
          if( this.atual.distance <= this.atual.radius) {
            console.log('estou dentro!!')
            this.inZone = true;

            this.db.get('parked').then((parked) => {
              if(parked) {} 
              else {
                let data = {
                  token:      this.device.uuid || 'pc-rogerio',
                  idZona:     this.atual.id.toString(),
                  latitude:   this.myLoc.lat.toString(),
                  longitude:  this.myLoc.lng.toString()
                }

                this.zona.occupy(data)
                    .then( data => {
                      this.db.set('parked', this.atual);
                    } )
                    .catch( console.error )
              }
            });


            
          } else {
            console.log('estou fora!!!')
            this.inZone = false;

            this.db.get('parked').then((parked) => {              
              if(parked) {
                let data = {
                  token:      this.device.uuid || 'pc-rogerio',
                  idZona:       parked.id
                }

                this.zona.freeSpace(data)
                    .then( result => {
                      this.db.remove('parked')
                    } )
                    .catch( console.error )
              } 
              else { }
            });

          }

      }, 2000 )
    }

  }


  findBestParking() {
    // console.log('myLoc')
    // console.log(this.myLoc)

    // console.log('myLoc')
    // console.log(this.myLoc)
    
  }


  generateRoute(){
    if(this.myLoc && this.atual) {
      let data = {
        latOrigin: this.myLoc.lat,
        lngOrigin: this.myLoc.lng,
        latDestination: parseFloat(this.atual.latitude),
        lngDestination: parseFloat(this.atual.longitude)
      }
      let routeModal = this.modalCtrl.create(DirectionPage, { data: data } );

      routeModal.onDidDismiss(data => {
        console.log(data);
      });
      routeModal.present();

    }
    
  }



  getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2, unit = 'm')  {
    return new Promise( (resolve, reject) => {
  
      
      if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
      }
      else {
        var radlat1 = Math.PI * lat1/180;
        var radlat2 = Math.PI * lat2/180;
        var theta = lon1-lon2;
        var radtheta = Math.PI * theta/180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
          dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit=="K") { dist = dist * 1.609344 }
        if (unit=="N") { dist = dist * 0.8684 }
        if (unit=="m") { dist = (dist * 1.609344) * 1000 }
        
        resolve( dist ) ;
      }

      
    } )
   
    
  }
  
}
