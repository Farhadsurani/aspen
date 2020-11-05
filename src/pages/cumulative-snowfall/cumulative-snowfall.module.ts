import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CumulativeSnowfallPage } from './cumulative-snowfall';

@NgModule({
  declarations: [
    CumulativeSnowfallPage,
  ],
  imports: [
    IonicPageModule.forChild(CumulativeSnowfallPage),
  ],
  exports: [
    CumulativeSnowfallPage
  ]
})
export class CumulativeSnowfallPageModule {}
