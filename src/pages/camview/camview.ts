import { Component } from '@angular/core';
import {  IonicPage,NavController, NavParams ,ViewController} from 'ionic-angular';

/**
 * Generated class for the NavigationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-camview',
  templateUrl: 'camview.html',
})
export class CamviewPage {

  header : any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController) {
        this.header={ismenu:true,ishome:true,share:true};
  }
  ionViewDidLoad() {
    // console.log('ionViewDidLoad NavigationPage');
  }
  dismiss(){

  }

}
