import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CamviewPage } from './camview';

@NgModule({
  declarations: [
    CamviewPage,
  ],
  imports: [
    IonicPageModule.forChild(CamviewPage),
  ],
  exports: [
    CamviewPage
  ]
})
export class CamviewPageModule {}
