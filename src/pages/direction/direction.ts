import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController, ViewController } from 'ionic-angular';

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-direction',
  templateUrl: 'direction.html',
})
export class DirectionPage {

  positions: any;
  @ViewChild('map') mapEl: ElementRef;
  map: any;
  myMarker: any;

  myLoc: any;
  destinationLoc: any;

  markerPointDestiny: any;
  markerPointOrigin: any;

  private directionsDisplay = new google.maps.DirectionsRenderer({ suppressMarkers: true });

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController
    ) {
    this.positions = navParams.get('data')
    this.myLoc = { lat: this.positions.latOrigin, lng: this.positions.lngOrigin};
    this.destinationLoc = { lat: this.positions.latDestination, lng: this.positions.lngDestination};


    
    
  }

  ionViewDidLoad() {
    console.log(this.positions);
    this.generateRote()
  }


  close() {
    this.viewCtrl.dismiss();
  }

  generateRote() {
    // let mapOptions = {
    //   center:  this.myLoc,
    //   zoom: 17,
    //   mapTypeId: google.maps.MapTypeId.ROADMAP,
    //   disableDefaultUI: true,
    //   clickableIcons: false
    // };

    // this.map = new google.maps.Map(this.mapEl.nativeElement, mapOptions);
    // this.map.setCenter(this.myLoc);
    // this.myMarker = new google.maps.Marker();
    // //this.myMarker.setPosition( this.myLoc )
    // this.myMarker.setOptions({
    //   position: this.myLoc,
    //   map: this.map,
    //   draggable: false,
    //   animation: google.maps.Animation.DROP,
    //   icon: {
    //     url: "assets/icon/car.png",
    //     scaledSize: new google.maps.Size(50, 50)
    //   },
    // });
   

    this.markerPointDestiny = new google.maps.Marker();
    this.markerPointOrigin = new google.maps.Marker();



    let loadingRoute = this.loadingCtrl.create({ content: 'Criando Rota...' });
        loadingRoute.present();

        console.log(this.myLoc.lat, this.myLoc.lng)
        console.log(this.destinationLoc.lat, this.destinationLoc.lng )


        let mapOptions = {
          center: new google.maps.LatLng( this.myLoc.lat, this.myLoc.lng ),
          zoom: 17,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: true,
          clickableIcons: false
        };
  
        this.map = new google.maps.Map(this.mapEl.nativeElement, mapOptions);
        
        let origin = new google.maps.LatLng( this.myLoc.lat, this.myLoc.lng );
        let destiny = new google.maps.LatLng( this.destinationLoc.lat, this.destinationLoc.lng );
        let directions = new google.maps.DirectionsService();
        this.directionsDisplay.setMap(this.map);
        
        directions.route({
          origin: origin,
          destination: destiny,
          travelMode: google.maps.TravelMode.TRANSIT
        }, (response, status) => {
          if (status == google.maps.DirectionsStatus.OK) {
            loadingRoute.dismiss();


            this.markerPointDestiny.setOptions({ position: destiny,  icon: { url: "assets/icon/parking.png",scaledSize: new google.maps.Size(50,50) }, map: this.map });
            this.markerPointOrigin.setOptions({ position: origin, icon: { url: "assets/icon/carrobolado.png",  scaledSize: new google.maps.Size(50,50) }, map: this.map });
            this.directionsDisplay.setDirections(response);
          }
        })


  }



  /*

let loadingRoute = this.loadingCtrl.create({ content: 'Criando Rota...' });
        loadingRoute.present();

        let origin = new google.maps.LatLng( this.originLoc.lat, this.originLoc.lng );
        let destiny = new google.maps.LatLng( this.destinyLoc.lat, this.destinyLoc.lng );
        let directions = new google.maps.DirectionsService();
        this.directionsDisplay.setMap(this.map);
        
        directions.route({
          origin: origin,
          destination: destiny,
          travelMode: google.maps.TravelMode.DRIVING
        }, (response, status) => {
          if (status == google.maps.DirectionsStatus.OK) {
            loadingRoute.dismiss();

            this.myMarker.setMap(null);

            this.markerPointDestiny.setOptions({ position: destiny,  icon: { url: "assets/icon/bandeira.png",scaledSize: new google.maps.Size(50,50) }, map: this.map });
            this.markerPointOrigin.setOptions({ position: origin, icon: { url: "assets/icon/marker.png",  scaledSize: new google.maps.Size(50,50) }, map: this.map });
            this.directionsDisplay.setDirections(response);


  */

}
