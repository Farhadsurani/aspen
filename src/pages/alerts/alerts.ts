import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { WeatherPage } from '../../pages/weather/weather';
import { MembershipOptionsPage } from '../../pages/membership-options/membership-options';
import { AlertController } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';
/**
 * Generated class for the AlertsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-alerts',
  templateUrl: 'alerts.html',
})
export class AlertsPage {

  constructor(public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams,private storage: Storage,public viewCtrl: ViewController) {
    
    //this.showConfirm();
              
          
    
  }
  /*showConfirm() {
    const confirm = this.alertCtrl.create({
      title: 'Membership alert',
      message: 'You Need to Upgrade your Membership in order to access this feature.',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
            this.navCtrl.push(WeatherPage,{id:'0'});
          }
        },
        {
          text: 'Agree',
          handler: () => {
            console.log('Agree clicked');
            this.navCtrl.push(MembershipOptionsPage);
          }
        }
      ]
    });
    confirm.present();
  }*/
  dismiss() {
    this.viewCtrl.dismiss();
  }
  agree_fun()
  {
    this.navCtrl.push(MembershipOptionsPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AlertsPage');
  }

}
