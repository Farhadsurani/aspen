import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { aboutUSPage } from './aboutUS';

@NgModule({
  declarations: [
    aboutUSPage,
  ],
  imports: [
    IonicPageModule.forChild(aboutUSPage),
  ],
  exports: [
    aboutUSPage
  ]
})
export class aboutUSPageModule {}
