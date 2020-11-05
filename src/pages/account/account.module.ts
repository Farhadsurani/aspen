import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { accountPage } from './account';

@NgModule({
  declarations: [
    accountPage,
  ],
  imports: [
    IonicPageModule.forChild(accountPage),
  ],
  exports: [
    accountPage
  ]
})
export class accountPageModule {}
