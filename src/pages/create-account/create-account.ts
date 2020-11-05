import { Component } from '@angular/core';
import { IonicPage,NavController, NavParams } from 'ionic-angular';
import { WeatherPage } from '../../pages/weather/weather';
import { ConfigUrls } from '../../config/config';
import { Alert_page } from '../../config/alerts';
import { HeaderComponent } from '../header/header.component';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { Http } from '@angular/http';
import { LoginPage } from '../../pages/login/login';
import { MembershipOptionsPage } from '../../pages/membership-options/membership-options';
import 'rxjs/add/operator/map';



/**
 * Generated class for the CreateAccountPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-create-account',
  templateUrl: 'create-account.html',
})
export class CreateAccountPage {
    Loginpage = LoginPage;
    WeatherPage = WeatherPage;
    
    MembershipOptionspage  = MembershipOptionsPage;
    header : any;
    apiData:any = {};
    register : any = {};
    ads_data : any = {};
    register_url:string = '';//

  constructor(public navCtrl: NavController, public navParams: NavParams,
                      public http: Http,public appServiceProvider : AppServiceProvider) {
      this.header={ismenu:true,ishome:false,share:true};
  }

  ionViewDidLoad() {
      this.getNonce();
      this.getads();
    console.log('ionViewDidLoad CreateAccountPage');
  }
 
  signup(){

           let regExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

          if(!this.register.hasOwnProperty("first_name")){
               this.appServiceProvider.showAlert(Alert_page.enter_firstname);
              return;
          }
          else if(!this.register.hasOwnProperty("last_name")){
               this.appServiceProvider.showAlert(Alert_page.enter_lastname);
              return;
          }else if(!this.register.hasOwnProperty("email")){
               this.appServiceProvider.showAlert(Alert_page.email_validattion);
              return;
          }
          else if(!regExp.test(this.register.email)){
                   this.appServiceProvider.showAlert(Alert_page.email_validattion);
                  return;
          }
          else if(!this.register.hasOwnProperty("confemail")){
               this.appServiceProvider.showAlert(Alert_page.enter_confirmemail);
              return;
          }
          else if(this.register.email != this.register.confemail){
               this.appServiceProvider.showAlert(Alert_page.emailmatch);
              return;
          }else if(!this.register.hasOwnProperty("user_pass")){
               this.appServiceProvider.showAlert(Alert_page.password_validattion);
              return;
          }else if(!this.register.hasOwnProperty("confuser_pass")){
                this.appServiceProvider.showAlert(Alert_page.enter_confirmpassword);
                return;
          }else if(this.register.user_pass != this.register.confuser_pass){
                          this.appServiceProvider.showAlert(Alert_page.passwordmatch);
                         return;
           }
                this.http.get("https://aspenweather.net/api/?json=get_nonce&controller=user&method=register").map(res => res.json()).subscribe(data1 => {
                    
            this.register_url = this.register.email + "&first_name=" + this.register.first_name + "&last_name="+
                                ""+this.register.last_name + "&email=" + this.register.email +
                                ""+"&nonce="+data1.nonce+"&display_name="+ this.register.first_name +"&notify=both&user_pass="+
                                ""+ this.register.user_pass;
                                   console.log("Registration Nonce",data1.nonce);
                                console.log("reg urll: ",this.register_url);
            this.appServiceProvider.presentLoading();
            this.http.get(ConfigUrls.baseUrl + ConfigUrls.register + this.register_url).map(res => res.json()).subscribe(data => {
                       this.appServiceProvider.hideLoading();
                       console.log("status......................",data.status);
                      if(data.status == 'ok'){
                                                   this.appServiceProvider.setUserDetails(data);
                                                   ConfigUrls.authtoken = data.cookie;
                                                   this.userMetaData();
                                                   //this.appServiceProvider.setUserDetails();
                                                   //this.appServiceProvider.showAlert("Please login into your account");
                                             }else
                                                  this.appServiceProvider.showAlert(Alert_page.tryagain);
                                                  console.log('else parth.......');
                     },
                           err=> {
                               console.log(err);
                              this.appServiceProvider.hideLoading();
                             this.appServiceProvider.showAlert(Alert_page.tryagain);
                             console.log('error parth..........');
                          });
                        });

  }


   userMetaData(){
        this.appServiceProvider.presentLoading();
        this.http.get(ConfigUrls.baseUrl + ConfigUrls.usermetadata + ConfigUrls.authtoken ).map(res => res.json()).subscribe(data => {
                              this.appServiceProvider.hideLoading();
                              if(data.status == 'ok'){
                                    this.appServiceProvider.setUsercapabilities(data.wp_capabilities);
                                    this.appServiceProvider.showAlert(Alert_page.registersuccess,() =>{
                                                     this.navCtrl.push(LoginPage);
                                     });
                               }
                               else
                                    this.appServiceProvider.showAlert(Alert_page.tryagain);
                                    

                             },
                                  err => {
                                      this.appServiceProvider.hideLoading();
                                     this.appServiceProvider.showAlert(Alert_page.tryagain);
                                     

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
//classs end
