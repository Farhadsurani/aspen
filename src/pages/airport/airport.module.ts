import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AirportPage } from './airport';

@NgModule({
  declarations: [
    AirportPage,
  ],
  imports: [
    IonicPageModule.forChild(AirportPage),
  ],
  exports: [
    AirportPage
  ]
})
export class AirportPageModule {}
