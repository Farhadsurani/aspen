import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController} from 'ionic-angular';
import { CreateAccountPage } from '../../pages/create-account/create-account';
import { JoinNowPage } from '../../pages/join-now/join-now';
import { MembershipOptionsPage } from '../../pages/membership-options/membership-options';
import { WeatherPage } from '../../pages/weather/weather';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { ConfigUrls } from '../../config/config';
import { Alert_page } from '../../config/alerts';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { Http } from '@angular/http';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
/**
 * Generated class for the TermsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-terms',
  templateUrl: 'terms.html',
})
export class TermsPage {
  content = "";
  forecast_discussion_arr : any =  {};
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http,private appServiceProvider : AppServiceProvider) {
    this.http.get("https://aspenweather.net/api/get_page/?id=5196").map(res => res.json()).subscribe(data => {
     this.content = data.page.content;
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TermsPage');
   
  }
  

}
