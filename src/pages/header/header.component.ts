import { Component,Input } from '@angular/core';
import { NavController , ModalController } from 'ionic-angular';
import { NavigationPage } from '../navigation/navigation-component';


@Component({
  selector: 'header-component',
  templateUrl: 'header.html'
})
export class HeaderComponent {
  @Input() headerpush;
  constructor(public navCtrl: NavController,public modalCtrl: ModalController) {

  }
  set header(header_data: any) {
    this.headerpush=header_data;
  }
  get header() {
    return this.headerpush;
  }

  menutoggle(){
    console.log("menu");
    let navmodal = this.modalCtrl.create(NavigationPage);
    navmodal.present();
  }
  sharefb(){

    var url = "https://www.facebook.com/Aspen-Weather-122081124509650/";
    window.open(url, '_system', 'location=yes');        
  return true;
   // "https://www.facebook.com/Aspen-Weather-122081124509650/"

  }
  sharetw(){
    var url = "https://twitter.com/search?q=%40weatheraspen&src=typd";
    window.open(url, '_system', 'location=yes');        
  return true;
   // "https://twitter.com/search?q=%40weatheraspen&src=typd"
  }

}
