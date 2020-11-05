import { Inject,Injectable } from '@angular/core';
import { LoadingController,AlertController} from 'ionic-angular';
import {NavController, NavParams} from "ionic-angular/index";
import {Storage} from '@ionic/storage';
import { ConfigUrls } from '../../config/config';
import { Alert_page } from '../../config/alerts';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { WeatherPage } from '../../pages/weather/weather';
import { cardPage } from '../../pages/card/card';
import { accountPage } from '../../pages/account/account';
/*
  Generated class for the LoginServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AppServiceProvider {
  loading : any;
  membership : "";
  email : "";
  userName : "";
 // private navCtrl:NavController;
  constructor(@Inject(LoadingController) private loadingCtrl: LoadingController,
    @Inject(AlertController) private alertCtrl : AlertController,
   @Inject(Storage) private storage:Storage,
   @Inject(Http) private http: Http) {
    console.log('Hello LoginServiceProvider Provider');
  }

  presentLoading() {
    this.loading = this.loadingCtrl.create();
    this.loading.present();

  }

  hideLoading(){

      this.loading.dismiss();
  }

  showAlert(msg:string, fn ?: () => void){

      let alert = this.alertCtrl.create({
          title: 'ASPEN WEATHER',
          message: msg,
          buttons: [{
                           text: 'OK',
                           role: 'cancel',
                           handler: () => {

                                  if(typeof(fn) != 'undefined' && typeof(fn) != null)
                                              fn();
                           }
            }]
        });
        alert.present();
  }
  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'ASPEN WEATHER',
      message: 'are you sure you want to Logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Logout',
          handler: () => {
            console.log('Buy clicked');

          }
        }
      ]
    });
    alert.present();
  }
  //store the UserDetails
      setUserDetails(user){
      this.storage.set('userdata',user);
      this.storage.set('email',user.email);
      this.storage.set('username',user.displayname);
      }

      //get the UserDetails
      getUserDetails(){
      	this.storage.get('userdata').then(data=>{
      		console.log('userdata: '+ JSON.stringify(data));
      	});
      }

      //get the UserDetails
      getAuthkey(){

          return new Promise(resolve => {

            this.storage.get('userdata').then(data => {

                           if(data != null && data.hasOwnProperty('cookie'))
                              resolve(data.cookie);
                           else
                               resolve('');

            });
           });
     }

    
      //delete the UserDetails
      removeUserDetails(){
      this.storage.remove('userdata').then(()=>{
      		console.log('userdata is removed');
      	});
      }

      /******capabilities start*****/

          setUsercapabilities(capability){
            this.storage.set('capability',capability);
            }

         //get the capability
         getUsercapabilities(){

            	return new Promise(resolve => {

                          this.storage.get('capability').then(data => {

                                         if(data != null)
                                            resolve(data);
                                         else
                                             resolve('');

                          });
                         });
         }


       /******capabilities end*****/

      //clear the whole local storage
      clearStorage(){
      	this.storage.clear().then(()=>{
  		      console.log('all keys are cleared');
      	});
      }


      

      /*********reuse services******/

      userMetaData(){
            this.presentLoading();
            this.http.get(ConfigUrls.baseUrl + ConfigUrls.usermetadata + ConfigUrls.authtoken ).map(res => res.json()).subscribe(data => {
                                  this.hideLoading();
                                  if(data.status == 'ok'){
                                        this.setUsercapabilities(data.capabilities);
                                        this.showAlert(Alert_page.loginsuccess,() =>{
                                                       //  this.navCtrl.push(WeatherPage);
                                         });
                                   }
                                   else
                                        this.showAlert(data.error || Alert_page.disconnect_server);

                                 },
                                      err => {
                                          this.hideLoading();
                                         this.showAlert(err.status || Alert_page.disconnect_server);

                                  });

         }


         getforecast_discussion(){
            
            this.http.get(ConfigUrls.baseUrl + ConfigUrls.usermetadata + ConfigUrls.authtoken ).map(res => res.json()).subscribe(data => {
                                 
                                  if(data.status == 'ok'){
                                       
                                   }
                                   else{}
                                       

                                 },
                                      err => {
                                         

                                  });

         }

         


}
