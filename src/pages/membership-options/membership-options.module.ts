import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MembershipOptionsPage } from './membership-options';

@NgModule({
  declarations: [
    MembershipOptionsPage,
  ],
  imports: [
    IonicPageModule.forChild(MembershipOptionsPage),
  ],
  exports: [
    MembershipOptionsPage
  ]
})
export class MembershipOptionsPageModule {}
