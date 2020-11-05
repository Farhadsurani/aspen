 import { Component } from '@angular/core';
import { IonicPage,NavController,ModalController } from 'ionic-angular';
import { CamviewPage } from '../../pages/camview/camview';
import { ConfigUrls } from '../../config/config';
import { Http } from '@angular/http';
import { HeaderComponent } from '../header/header.component';
import 'rxjs/add/operator/map';
import { AirportPage } from '../../pages/airport/airport';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { Alert_page } from '../../config/alerts';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import {Storage} from '@ionic/storage';

/**
 * Generated class for the WebcamPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more inf
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class accountPage {
   header : any;
   camview = CamviewPage;
   apiData:any = {};
   newPasssword : any = {};
   userData:any = {};
   email:"";
   userName : "";
   constructor(protected _sanitizer: DomSanitizer, private storage:Storage,public navCtrl: NavController,private http: Http,private modalCtrl : ModalController,private appServiceProvider : AppServiceProvider) {
    this.header={ismenu:true,ishome:true,share:true};
}
  // constructor(public navCtrl: NavController, public navParams: NavParams) {
  //      this.header={ismenu:true,ishome:true,share:true};
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad accountPage');
   
    // this.email = ConfigUrls.email; 
    // this.userName = ConfigUrls.userName;
    console.log(this.email);
    console.log(this.userName);


    this.getUserDetails();

    this.loadData();
  }
  loadData(){

    this.appServiceProvider.presentLoading();
    this.http.get(ConfigUrls.baseUrl + ConfigUrls.accountPage).map(res => res.json()).subscribe(data => {

                            this.appServiceProvider.hideLoading();
                            if(data.status == "ok"){
                                  this.apiData = data;
                                //  console.log(data);
                            }
                            else
                                this.appServiceProvider.showAlert(data.error || Alert_page.disconnect_server);


                     },
                          err => {
                              this.appServiceProvider.hideLoading();
                              this.appServiceProvider.showAlert(err.status || Alert_page.disconnect_server);
                          });

}

public transform(value: string, type: string = 'html'): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
  
    return this._sanitizer.bypassSecurityTrustHtml(value);
   
    
  
}

 //get the UserDetails
      getUserDetails(){
      	this.storage.get('userdata').then(data=>{
         
          // console.log(data);
          data = this.userData;
      
      	});
      }



isArrayEmpty(arr){

  return Object.keys(arr).length == 0;
}


SaveChanges()
{
  if(!this.newPasssword.hasOwnProperty("user_pass")){
    this.appServiceProvider.showAlert(Alert_page.password_validattion);
   return;
}else if(!this.newPasssword.hasOwnProperty("confuser_pass")){
     this.appServiceProvider.showAlert(Alert_page.enter_confirmpassword);
     return;
}else if(this.newPasssword.user_pass != this.newPasssword.confuser_pass){
               this.appServiceProvider.showAlert(Alert_page.passwordmatch);
              return;
}

// this.register_url = this.register.first_name + "&first_name=" + this.register.first_name + "&last_name="+
// ""+this.register.last_name + "&email=" + this.register.email +
// ""+"&nonce="+this.apiData.nonce+"&display_name="+ this.register.first_name +"&notify=both&user_pass="+
// ""+ this.register.user_pass +"&insecure=cool";


this.appServiceProvider.presentLoading();
this.http.get(ConfigUrls.baseUrl + ConfigUrls.register + "").map(res => res.json()).subscribe(data => {
this.appServiceProvider.hideLoading();
if(data.status == 'ok'){
                   this.appServiceProvider.setUserDetails(data);
                   ConfigUrls.authtoken = data.cookie;
                   
                   this.appServiceProvider.showAlert(Alert_page.registersuccess);
             }else
                  this.appServiceProvider.showAlert(Alert_page.tryagain);
},
err=> {
console.log(err);
this.appServiceProvider.hideLoading();
this.appServiceProvider.showAlert(Alert_page.tryagain);

});


};

}
