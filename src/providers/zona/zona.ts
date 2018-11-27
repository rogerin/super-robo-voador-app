import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

let route = "https://super-robo-voador-daivid.c9users.io/endPoints";

@Injectable()
export class ZonaProvider {

  /*
    
    
  */

  constructor(public http: HttpClient) {
    console.log('Hello ZonaProvider Provider');
    console.log(route);
    
  }


  getZones() {
    return new Promise( 
      (resolve, reject) =>
        this.http.get( route + '/getZonas.php').subscribe(resolve, reject )
      );
  } 

  occupy(data) {

      return new Promise( 
        (resolve, reject) =>
          this.http.get( route + '/ocuparVaga.php?idZona='+data.idZona+'&latitude='+data.latitude+'&longitude='+data.longitude+'&token='+data.token).subscribe(resolve, reject )
        );
  }


  freeSpace(data) {
    return new Promise( 
      (resolve, reject) =>
        this.http.get( route + '/liberarVaga.php?token='+data.token+'&idZona='+data.idZona ).subscribe(resolve, reject )
      );
}
  



}
