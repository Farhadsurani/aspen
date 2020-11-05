import { Component } from '@angular/core';
import { NavController , ModalController } from 'ionic-angular';


@Component({
  selector: 'footer-component',
  templateUrl: 'footer.html'
})
export class FooterComponent {
 // @Input() footerpush;
  constructor(public navCtrl: NavController,public modalCtrl: ModalController) {

  }
 /* set header(footer_data: any) {
    this.footerpush=footer_data;
  }
  get header() {
    return this.footerpush;
  } */

}
