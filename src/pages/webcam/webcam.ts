import { Component } from '@angular/core';
import { IonicPage,NavController,ModalController } from 'ionic-angular';
import { CamviewPage } from '../../pages/camview/camview';
import { ConfigUrls } from '../../config/config';
import { Http ,RequestOptions ,Headers } from '@angular/http';
import { HeaderComponent } from '../header/header.component';
import 'rxjs/add/operator/map';
import { AirportPage } from '../../pages/airport/airport';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { Alert_page } from '../../config/alerts';
import { MembershipOptionsPage } from '../../pages/membership-options/membership-options';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../../pages/login/login';
/**
 * Generated class for the WebcamPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-webcam',
  templateUrl: 'webcam.html',
})
export class WebcamPage {
   header : any;
   camview = CamviewPage;
   apiData:any = {};//ads_data
   ads_data:any = {};//
   membership = "";
   constructor(private storage: Storage,public navCtrl: NavController,private http: Http,private modalCtrl : ModalController,private appServiceProvider : AppServiceProvider) {
    this.header={ismenu:true,ishome:true,share:true};
    this.storage.get('userID').then((val) => {
      console.log("go to login page1",val);
            if(val == null)
            {
              console.log("go to login page..");
              this.navCtrl.push(LoginPage);
            }
    });

}
  // constructor(public navCtrl: NavController, public navParams: NavParams) {
  //      this.header={ismenu:true,ishome:true,share:true};
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WebcamPage');
    this.membershipLoadData();
   this.doLogin();
    this.loadData();
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

  loadData(){

    this.appServiceProvider.presentLoading();
    this.http.get(ConfigUrls.baseUrl + ConfigUrls.WebcamPage).map(res => res.json()).subscribe(data => {

                            this.appServiceProvider.hideLoading();
                            if(data.status == "ok"){
                                  this.apiData = data;
                                 
                                 if(this.membership == "s2member_level1")//s2member_level3
                                 {
                                   this.navCtrl.push(MembershipOptionsPage);
                                 }
                                 else if(this.membership == "subscriber")
                                 {
                                   this.navCtrl.push(MembershipOptionsPage);
                                 }
                                 else if(this.membership == "s2member_level2")
                                 {
                                   this.navCtrl.push(MembershipOptionsPage);
                                 }
                                 else if(this.membership == "s2member_level2")
                                 {
                                   this.navCtrl.push(MembershipOptionsPage);
                                 }
                                 else
                                 {

                                 }
                            }
                            else
                                this.appServiceProvider.showAlert(data.error || Alert_page.disconnect_server);


                     },
                          err => {
                              this.appServiceProvider.hideLoading();
                              this.appServiceProvider.showAlert(err.status || Alert_page.disconnect_server);
                          });

}



membershipLoadData()
{
 

 this.storage.get('userID').then((val) => {
   console.log('userID--------', val);


   this.storage.set('userID', val);
  //console.log("user details ----------->",this.appServiceProvider.getUserDetails);   
 //  this.http.get("https://aspenweather.net/wp-json/custom_user_details/1998?callback=parseResponse").map(res => res.json()).subscribe(data => {
  //https://aspenweather.net/wp-json/custom_user_details/1998?callback=parseResponse

   console.log("https://aspenweather.net/wp-json/custom_user_details/" + val+"?callback=parseResponse");
   this.http.get("https://aspenweather.net/wp-json/custom_user_details/" + val +"?callback=parseResponse").map(res => res.json()).subscribe(data => {
   // this.http.get("http://79.170.44.115/stagedev.com/aspen/wp-json/custom_user_details/1998").map(res => res.json()).subscribe(data => {
                              console.log("membership---->",this.membership);
                               console.log(data);
                               this.membership = data[0];


                  },
                     );
                   });

}

isArrayEmpty(arr){

  return Object.keys(arr).length == 0;
}

doLogin() {
  let body = new FormData();
  body.append('email','website');
  body.append('password','Web1Web1');
  let headers = new Headers({
    'NDAPI-Key': 'XXXXXXXXX',
    'NDAPI-Host': 'XXXXXXXXX' });
  let options = new RequestOptions({ headers: headers });

  this.http
      .post('http://50.76.133.221/GetData.cgi?CH=1', body, options)
      .map(res => res.json())
      .subscribe(
          data => {
            // console.log(data);
          },
          err => {
            console.log("ERROR!: ", err);
          }
      );
}


}
