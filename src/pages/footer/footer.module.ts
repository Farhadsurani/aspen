import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { footerPage } from './footer';

@NgModule({
  declarations: [
    footerPage,
  ],
  imports: [
    IonicPageModule.forChild(footerPage),
  ],
  exports: [
    footerPage
  ]
})
export class footerPageModule {}
