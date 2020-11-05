import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JoinNowPage } from './join-now';

@NgModule({
  declarations: [
    JoinNowPage,
  ],
  imports: [
    IonicPageModule.forChild(JoinNowPage),
  ],
  exports: [
    JoinNowPage
  ]
})
export class JoinNowPageModule {}
