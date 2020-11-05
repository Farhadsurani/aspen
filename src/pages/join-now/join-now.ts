import { Component } from '@angular/core';
import { IonicPage, NavController,ModalController} from 'ionic-angular';
import { CreateAccountPage } from '../../pages/create-account/create-account';
import { MembershipOptionsPage } from '../../pages/membership-options/membership-options';
import { HeaderComponent } from '../header/header.component';
import { ConfigUrls } from '../../config/config';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AirportPage } from '../../pages/airport/airport';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { Alert_page } from '../../config/alerts';
import { TermsPage } from '../../pages/terms/terms';


/**
 * Generated class for the JoinNowPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-join-now',
  templateUrl: 'join-now.html',
})
export class JoinNowPage {

 createaccountpage = CreateAccountPage;
 membershipOptionsPage = MembershipOptionsPage;
 header : any;
 apiData:any = {};
 ads_data:any = {};//

  constructor(public navCtrl: NavController,private http: Http,private modalCtrl : ModalController,private appServiceProvider : AppServiceProvider) {

      this.header={ismenu:true,ishome:true,share:true};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JoinNowPage');
    this.loadData();
    this.getads();
  }

  loadData(){

              this.appServiceProvider.presentLoading();
              this.http.get(ConfigUrls.baseUrl + ConfigUrls.learnmorepage).map(res => res.json()).subscribe(data => {

                                      this.appServiceProvider.hideLoading();
                                      if(data.status == "ok"){
                                            this.apiData = data.page;
                                      }
                                      else
                                          this.appServiceProvider.showAlert(data.error || Alert_page.disconnect_server);


                               },
                                    err => {
                                        this.appServiceProvider.hideLoading();
                                        this.appServiceProvider.showAlert(err.status || Alert_page.disconnect_server);
                                    });

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

}
