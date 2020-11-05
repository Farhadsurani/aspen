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


/**
 * Generated class for the WebcamPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-aboutUS',
  templateUrl: 'aboutUS.html',
})
export class aboutUSPage {
   header : any;
   camview = CamviewPage;
   apiData:any = {};
   ads_data:any = {};
   constructor(protected _sanitizer: DomSanitizer,public navCtrl: NavController,private http: Http,private modalCtrl : ModalController,private appServiceProvider : AppServiceProvider) {
    this.header={ismenu:true,ishome:true,share:true};
}
  // constructor(public navCtrl: NavController, public navParams: NavParams) {
  //      this.header={ismenu:true,ishome:true,share:true};
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad aboutUSPage');
   
    this.loadData();
    this.getads();
  }
  loadData(){

    this.appServiceProvider.presentLoading();
    this.http.get(ConfigUrls.baseUrl + ConfigUrls.UVOUTLOOKPage).map(res => res.json()).subscribe(data => {

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

getads()
{
 
  this.http.get(ConfigUrls.getAdsUrl).map(res => res.json()).subscribe(data => {
                    
    console.log(data);
                    
               this.ads_data = data;        
            

                     },
                          err => {
                             
                          
                      });

}


isArrayEmpty(arr){

  return Object.keys(arr).length == 0;
}


}
