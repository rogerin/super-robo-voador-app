import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { FavoriteParkingPage } from '../pages/favorite-parking/favorite-parking';
import { HistoricPage } from '../pages/historic/historic';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home',      component: HomePage },
      { title: 'Favoritos', component: FavoriteParkingPage },
      { title: 'Histórico', component: HistoricPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {

    console.log(page.component == HomePage)
    
    if(page.component == HomePage) {
      this.nav.setRoot(HomePage);
    } else {
      this.nav.push(page.component)
    }
  }
}
