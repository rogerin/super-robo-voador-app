import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ZonaProvider } from '../providers/zona/zona';

import { IonicStorageModule } from '@ionic/storage';


import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { DirectionPageModule } from '../pages/direction/direction.module'
import { FavoriteParkingPageModule } from '../pages/favorite-parking/favorite-parking.module'
import { HistoricPageModule } from '../pages/historic/historic.module'



@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    HttpClientModule,
    HttpModule,
    BrowserModule,
    DirectionPageModule,
    HistoricPageModule,
    FavoriteParkingPageModule,
    IonicModule.forRoot(MyApp, { backButtonText: 'Voltar' }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ZonaProvider
  ]
})
export class AppModule {}
