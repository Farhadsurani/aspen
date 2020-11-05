import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { cardPage } from './card';

@NgModule({
  declarations: [
    cardPage,
  ],
  imports: [
    IonicPageModule.forChild(cardPage),
  ],
  exports: [
    cardPage
  ]
})
export class cardPageModule {}
