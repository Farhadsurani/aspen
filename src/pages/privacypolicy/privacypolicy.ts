import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { WeatherPage } from '../../pages/weather/weather';
import { MembershipOptionsPage } from '../../pages/membership-options/membership-options';
import { AlertController } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';
import { Http } from '@angular/http';
import { HeaderComponent } from '../header/header.component';
import { ConfigUrls } from '../../config/config';

/**
 * Generated class for the PrivacypolicyPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-privacypolicy',
  templateUrl: 'privacypolicy.html',
})
export class PrivacypolicyPage {
header: any;
content = "";
MembershipOptionsPage = MembershipOptionsPage;
ads_data:any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http) {
    this.header={ismenu:true,ishome:true,share:true};
    this.http.get("https://aspenweather.net/api/get_page/?id=4013").map(res => res.json()).subscribe(data => {
      this.content = data.page.content;
       });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrivacypolicyPage');
    this.getads();
  }
  getads()
  {
   
    this.http.get(ConfigUrls.getAdsUrl).map(res => res.json()).subscribe(data => {
                      
      console.log(data);
                      
                 this.ads_data = data;        
              

                       },
                            err => {
                               
                            
                        });

  }
  goback()
  {
    this.navCtrl.push(MembershipOptionsPage);
  }
}
