import { Component } from '@angular/core';
import { IonicPage,NavController,ModalController } from 'ionic-angular';
import { CreateAccountPage } from '../../pages/create-account/create-account';
import { HeaderComponent } from '../header/header.component';
import { ConfigUrls } from '../../config/config';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AirportPage } from '../../pages/airport/airport';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { Alert_page } from '../../config/alerts';
import { WeatherPage } from '../../pages/weather/weather';
import { cardPage } from '../../pages/card/card';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../../pages/login/login';
import { AlertController } from 'ionic-angular';
import { InAppPurchase } from '@ionic-native/in-app-purchase';
import { TermPage } from "../../pages/term/term";
import { PrivacypolicyPage } from "../../pages/privacypolicy/privacypolicy";

/**
 * Generated class for the MembershipOptionsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-membership-options',
  templateUrl: 'membership-options.html',
})
export class MembershipOptionsPage {
  weatherpage= WeatherPage;
    createaccountpage  = CreateAccountPage;
    privacypolicypage = PrivacypolicyPage;
    termpage = TermPage;
     header : any;
      apiData:any = {};
      ads_data:any = {};
      products=[];
      Updateprice = "";
  membership ="";
  userID ="";
  UPDATEDmembership ="";
  transtionID ="";
  chmeber="";
  uid="";
  constructor(private iap: InAppPurchase,public alertCtrl: AlertController,public navCtrl: NavController,private http: Http,private modalCtrl : ModalController,private appServiceProvider : AppServiceProvider,private storage: Storage) {
        this.header={ismenu:true,ishome:true,share:true};
        this.iap.getProducts(['com.summit.aspen.basic','com.summit.aspen.premium','com.summit.aspen.vactioners'])
        .then((products) => {
          this.products = products;
        })
        .catch((err) => {
          console.log(err);
        });
        this.storage.get('userID').then((val) => {
          console.log("go to login page1",val);
                this.chmeber = val;
                
        });
        this.membershipLoadData();
       

  }
  gotosig()
  {
    
             
    
  }
  buy(productid) {
    
    if(this.membership == "")
    {
     
      this.navCtrl.push(CreateAccountPage);
    }
else if(this.membership == 's2member_level1'&& productid == 'com.summit.aspen.basic')
{
  this.appServiceProvider.showAlert("Your already in this membership please select other one");

}
else if(this.membership =="s2member_level3" && productid == 'com.summit.aspen.premium')
{
  this.appServiceProvider.showAlert("Your already in this membership please select other one");
}else if(this.membership == "s2member_level2" && productid =='com.summit.aspen.vactioners'){
  this.appServiceProvider.showAlert("Your already in this membership please select other one");
}
else{
    this.iap.buy(productid).then(data => {
      //this.enableItems(product);
      console.log("buy the product............",productid);
      if(productid == "com.summit.aspen.basic")
      {
        this.UPDATEDmembership="s2member_level1";

      }
      else if(productid == "com.summit.aspen.premium")
      {
        this.UPDATEDmembership="s2member_level3";
        
      }
      else if(productid == "com.summit.aspen.vactioners")
      {
        this.UPDATEDmembership="s2member_level2";
        
      }
      this.transtionID = data.transactionId;
//this.appServiceProvider.showAlert("Transaction ID:"+data.transactionId);
this.postCall();

    
    })
  }
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
          }
        }
      ]
    });
    confirm.present();
  }*/

  membershipLoadData()
  {
   
 
   this.storage.get('userID').then((val) => {
     console.log('userID--------', val);
 this.userID = val;

     this.storage.set('userID', val);


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
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad MembershipOptionsPage');
    this.loadData();
    this.getads();
    
  }
  postCall()
 {
  
   /* let body = new FormData();
    body.append('user_id',this.userID);
    body.append('curr_user_role',this.membership);
    body.append('update_user_role',this.UPDATEDmembership);
   
    body.append('subscr_id',this.transtionID);*/
    // let options = new RequestOptions{ headers: headers });
    console.log();
    

    this.uid = 'user_id='+this.userID+"&"+"curr_user_role="+this.membership+"&"+'update_user_role='+this.UPDATEDmembership+"&"+'subscr_id='+this.transtionID;
    console.log('transion post',this.transtionID);
    this.http
        .get('https://aspenweather.net/user-auth/?'+this.uid)
        .map(res => res.json())
        .subscribe(
            data => {
               if(data.status == "ok")
               {
                 this.appServiceProvider.showAlert("Your Membership is upgraded. Your New Membership will be activated with in 10 minutes");
                 //this.navCtrl.push(WeatherPage);
               }
               
            },
            err => {
              console.log("ERROR!: ", err);
              this.appServiceProvider.showAlert(err);
            }
        );
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
                this.http.get(ConfigUrls.baseUrl + ConfigUrls.membershippage).map(res => res.json()).subscribe(data => {

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
    isArrayEmpty(arr){

              return Object.keys(arr).length == 0;
         }


         basicMembership(){

          this.navCtrl.push(cardPage, {
            param1: '7', param2: 's2member_level1'
        });
          var basic = this.apiData.custom_fields.basic_price;
          console.log("basic",basic);

         

          basic = basic.replace('<span>one time($7/yr)</span>','');
          basic = basic.replace('$','');
          

          console.log('adddd------>',basic);

          this.storage.set('price','7');
          this.storage.set('updatedMembership','s2member_level1');
          //   var url = "https://aspenweather.net/basic/";
          //   window.open(url, '_system', 'location=yes');        
          // return true;
        
        
          }
          premium(){
            this.navCtrl.push(cardPage, {
              param1: '20', param2: 's2member_level3'
          });
            var premium = this.apiData.custom_fields.premium_price;
            console.log("basic",premium);
            this.storage.set('updatedMembership','s2member_level3');
           
  
            premium = premium.replace('<span>/month</span><span class=\"or\">or</span>$60<span>/6 mo</span> $80<span>/yr</span>','');
            
  
            console.log('adddd------>',premium);
  
            this.storage.set('price','20');


          //   var url = "https://aspenweather.net/premium/";
          //   window.open(url, '_system', 'location=yes');        
          // return true;
          
          }

          vacationers(){
            this.navCtrl.push(cardPage, {
              param1: '10', param2: 's2member_level2'
          });

            var vacationers = this.apiData.custom_fields.vacationers_price;
            console.log("vacationers price-------------->",vacationers);
  
            this.storage.set('updatedMembership','s2member_level2');
  
            vacationers = vacationers.replace('<span>/10 days</span>','');
            
  
            console.log('adddd------>',vacationers);
  
            this.storage.set('price','10');



          //   var url = "https://aspenweather.net/vacationers/";
          //   window.open(url, '_system', 'location=yes');        
          // return true;
           
          }
}
