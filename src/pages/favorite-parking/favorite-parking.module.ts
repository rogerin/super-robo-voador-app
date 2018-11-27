import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FavoriteParkingPage } from './favorite-parking';

@NgModule({
  declarations: [
    FavoriteParkingPage,
  ],
  imports: [
    IonicPageModule.forChild(FavoriteParkingPage),
  ],
})
export class FavoriteParkingPageModule {}
