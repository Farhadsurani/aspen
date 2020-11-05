import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WebcamPage } from './webcam';

@NgModule({
  declarations: [
    WebcamPage,
  ],
  imports: [
    IonicPageModule.forChild(WebcamPage),
  ],
  exports: [
    WebcamPage
  ]
})
export class WebcamPageModule {}
