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
import { TermsPage } from '../../pages/terms/terms';
import { TermPage } from '../../pages/term/term';
import { AlertsPage } from "../../pages/alerts/alerts";
import { PrivacypolicyPage } from "../../pages/privacypolicy/privacypolicy";
import 'rxjs/add/operator/map';


/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  createaccountpage  = CreateAccountPage;
  joinnowpage  = JoinNowPage;
  termspage = TermsPage;
  termpage = TermPage;
  alertspage = AlertsPage;
  privacypolicyPage = PrivacypolicyPage;
  membershipOptionsPage = MembershipOptionsPage;
  header : any;
  login:any = {};
  sampleurl;
  apiData:any = {};
  login_url : string= '';
  ads_data : any = {};
  userid='';
  constructor(public navCtrl: NavController, public navParams: NavParams,
        public http: Http,public appServiceProvider : AppServiceProvider,private alertCtrl: AlertController,private storage: Storage) {
        this.header={ismenu:true,ishome:true,share:true};
        this.storage.clear().then(()=>{
          console.log('all keys are cleared');
            });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.getads();
  }
    onPageWillLeave() {


   }

   loginSubmit(){

    console.log(this.login);
    let regExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if(!this.login.hasOwnProperty("username")){
      this.appServiceProvider.showAlert(Alert_page.email_validattion);
     return;
 }
 else if(!regExp.test(this.login.username)){
      this.appServiceProvider.showAlert(Alert_page.email_validattion);
     return;
 }else if(!this.login.hasOwnProperty("password")){
       this.appServiceProvider.showAlert(Alert_page.password_validattion);
       return;
 }

      this.login_url = this.login.username + "&password=" + this.login.password;
      this.appServiceProvider.presentLoading();
      this.http.get(ConfigUrls.baseUrl + ConfigUrls.login + this.login_url).map(res => res.json()).subscribe(data => {
    //  this.http.get("http://79.170.44.115/stagedev.com/aspen/api/auth/generate_auth_cookie/?nonce=836152a7a3&username=Test&password=abc@123&insecure=cool").map(res => res.json()).subscribe(data => {
                      this.appServiceProvider.hideLoading();
                      if(data.status == 'ok'){
                        this.appServiceProvider.setUserDetails(data);
                        ConfigUrls.authtoken = data.cookie;
                        
                         this.storage.set('userID', data.user.id);
                        
                         this.storage.get('userID').then((val) => {
                          console.log('userID--------', val);
                        });



                        this.userMetaData();
                           
                       }else
                            this.appServiceProvider.showAlert(Alert_page.tryagain);
               },
                    err => {
                         this.appServiceProvider.hideLoading();
                        this.appServiceProvider.showAlert(Alert_page.tryagain);

                    });

   }

   userMetaData(){
    //  this.appServiceProvider.presentLoading();
      this.http.get(ConfigUrls.baseUrl + ConfigUrls.usermetadata + ConfigUrls.authtoken).map(res => res.json()).subscribe(data => {
                         //   this.appServiceProvider.hideLoading();
                            if(data.status == 'ok'){
                                  this.appServiceProvider.setUsercapabilities(data.wp_capabilities);

                                 console.log("wp_capabilities:",this.appServiceProvider.getUsercapabilities);
                                 console.log("getUserDetails:",this.appServiceProvider.getUserDetails);
                                 this.navCtrl.push(WeatherPage);
                                 
                             }
                             else
                                  this.appServiceProvider.showAlert(data.error || Alert_page.disconnect_server);

                           },
                                err => {
                                    this.appServiceProvider.hideLoading();
                                   this.appServiceProvider.showAlert(err.status || Alert_page.disconnect_server);

                            });

   }

  


        forgotPasswordService(Email:string){
          this.appServiceProvider.presentLoading();
          console.log("email ids...........",Email);
         // this.http.get(ConfigUrls.baseUrl + ConfigUrls.forgotpassword+Email+ ConfigUrls.authtoken ).map(res => res.json()).subscribe(data => {
          this.http.get("https://aspenweather.net/custom-forgot-password/?user_email="+Email).map(res => res.json()).subscribe(data => {
                                        this.appServiceProvider.hideLoading();
                                        if(data.status == 'ok'){
                                              this.appServiceProvider.showAlert(data.msg);
                                         }
                                         else
                                              this.appServiceProvider.showAlert(data.error || Alert_page.disconnect_server);

                                       },
                                            err => {
                                                this.appServiceProvider.hideLoading();
                                               this.appServiceProvider.showAlert(err.status || Alert_page.disconnect_server);

                                        });


     }


     forgotPasswordAlert() {
       let alert = this.alertCtrl.create({
         title: 'ASPEN WEATHER ',
         inputs: [
          
           {
             name: 'email',
             placeholder: 'Please enter the registered Email ID',
             type: 'text'
           }
         ],
         buttons: [
           {
             text: 'Cancel',
             role: 'cancel',
             handler: data => {
               console.log('Cancel clicked');
             }
           },
           {
            
             text: 'Forgot Password',
             handler: data => {
               let regExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
              if(!regExp.test(this.login.hasOwnProperty('OK'))){
               //this.forgotPasswordService(data.email); 
               this.appServiceProvider.presentLoading();
               this.sampleurl = "https://aspenweather.net/custom-forgot-password/?user_email="+data.email;
               console.log(this.sampleurl);
               this.http.get(this.sampleurl).map(res => res.json()).subscribe(data => {
                this.appServiceProvider.hideLoading();
                if(data.status == 'ok'){
                      this.appServiceProvider.showAlert(data.msg);
                 }
                 else
                      this.appServiceProvider.showAlert(data.error || Alert_page.disconnect_server);

               },
                    err => {
                        this.appServiceProvider.hideLoading();
                       this.appServiceProvider.showAlert(err.status || Alert_page.disconnect_server);

                });
              console.log("email..id",data.email);
                return;
            }
            else 
            {
             this.appServiceProvider.showAlert(Alert_page.email_validattion);
            }
             
             }
           }
         ]
       });
       alert.present();
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

        getNonce(){

          this.appServiceProvider.presentLoading();
          this.http.get(ConfigUrls.baseUrl + ConfigUrls.getNonceUrl).map(res => res.json()).subscribe(data => {
      
                                  this.appServiceProvider.hideLoading();
                                  if(data.status == "ok"){
                                        this.apiData = data;
                                      
                                  }
                                  else
                                      this.appServiceProvider.showAlert(data.error || Alert_page.disconnect_server);
      
      
                           },
                                err => {
                                    this.appServiceProvider.hideLoading();
                                    this.appServiceProvider.showAlert(err.status || Alert_page.disconnect_server);
                                });
      
      }
}
