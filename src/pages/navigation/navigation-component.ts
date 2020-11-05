import { Component } from '@angular/core';
import {  NavController, NavParams ,ViewController,ModalController,} from 'ionic-angular';
import { WebcamPage } from '../../pages/webcam/webcam';
import { WeatherPage } from '../../pages/weather/weather';
import { MembershipOptionsPage } from '../../pages/membership-options/membership-options';
import { LoginPage } from '../../pages/login/login';
import { CumulativeSnowfallPage } from '../../pages/cumulative-snowfall/cumulative-snowfall';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { JoinNowPage } from '../../pages/join-now/join-now';
import { cardPage } from '../../pages/card/card';
import { accountPage } from '../../pages/account/account';
import { aboutUSPage } from '../../pages/aboutUS/aboutUS';
import { Alert_page } from '../../config/alerts';
import { AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { TermPage } from "../../pages/term/term";
import { PrivacypolicyPage } from "../../pages/privacypolicy/privacypolicy";
import { AlertsPage } from '../alerts/alerts';
/**
 * Generated class for the NavigationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-navigation',
  templateUrl: 'navigation.html',
})
export class NavigationPage {
  
  weather = [
      { title: "Weather",
            childs:[{"title":"Current","href":"WeatherPage",params:"0"},
            {"title":"Weather Discussion","href":"WeatherPage",params:"1"},
            {"title":"Delay Indicator","href":"WeatherPage",params:"2"},
            //{"title":"Powder Forecast","href":"WeatherPage",params:"2"},
            //{"title":"6 Day Powder","href":"WeatherPage",params:"2"},
            //{"title":"Cumulative Snowfall","href":"CumulativeSnowfallPage",params:"4"},
           {"title":"T-Storm Prediction","href":"WeatherPage",params:"3"},
            //
           {"title":"UV Outlook","href":"WeatherPage",params:"5"},
           //{"title":"Cumulative Snowfall","href":"WeatherPage",params:"4"}, 
           //{"title":"Snowfall Calendar","href":"WeatherPage",params:"5"},
           {"title":"3 Day Outlook","href":"WeatherPage",params:"4"}, 
           ]},
           { title: "Webcam",
            childs:[{title: "Airport Cam","href":"WebcamPage",params:"10"},          
           ]},

      
            {
              title: "Terms & Privacy Policy",
              childs:[
                //  {"title":"Upgrade","href":"MembershipOptionsPage",params:"8"},
                {"title":"Terms of Use","href":"TermPage",params:"12"},
                {"title":"Privacy Policy","href":"PrivacypolicyPage",params:"13"},
              
              ]
            },
            { title: "Account",
              childs:[
              //  {"title":"Upgrade","href":"MembershipOptionsPage",params:"8"},
              {"title":"Logout","href":"LoginPage",params:"9"},
            
            ]},
    ];
    public userID : number=null ;
    activePage: any;
    shownGroup = null;
    loginPage = LoginPage;
    webcampage = WebcamPage;
    membershipOptionsPage = MembershipOptionsPage;
    JoinNowPage = JoinNowPage;
    cardPage = cardPage;
    aboutUSPage = aboutUSPage;
    accountPage =accountPage;
    membership ="";
    CumulativeSnowfallPage = CumulativeSnowfallPage;
  constructor(private storage: Storage,private http: Http,public navCtrl: NavController, public navParams: NavParams,
  public viewCtrl: ViewController,public appServiceProvider : AppServiceProvider,private alertCtrl: AlertController,private modalCtrl : ModalController) {
    this.membershipLoadData();
    this.storage.get('userID').then((val) => {
       
    

        this.userID = val;
        console.log('this is navigation......', this.userID);
      });
  }

  toggleGroup(group) {
    
      if (this.isGroupShown(group)) {
        
          this.shownGroup = null;
        
          //this.shownGroup = null;
      } else {
          this.shownGroup = group;
      }
  };
  isGroupShown(group) {
    console.log('group function');
      return this.shownGroup === group;
  };

  dismiss() {
     this.viewCtrl.dismiss();
   }

   logout(){

      this.appServiceProvider.clearStorage();
      this.navCtrl.push(LoginPage);


   }
   useralert_info()
{
  let useralert = this.modalCtrl.create(AlertsPage);
  useralert.present();
}
   membershipLoadData()
     {
      
    
      this.storage.get('userID').then((val) => {
      //  console.log('userID--------', val);
    

        this.storage.set('userID', val);
       //console.log("user details ----------->",this.appServiceProvider.getUserDetails);   
      //  this.http.get("https://aspenweather.net/wp-json/custom_user_details/1998?callback=parseResponse").map(res => res.json()).subscribe(data => {
       //https://aspenweather.net/wp-json/custom_user_details/1998?callback=parseResponse

       // console.log("https://aspenweather.net/wp-json/custom_user_details/" + val+"?callback=parseResponse");
        this.http.get("https://aspenweather.net/wp-json/custom_user_details/" + val +"?callback=parseResponse").map(res => res.json()).subscribe(data => {
        // this.http.get("http://79.170.44.115/stagedev.com/aspen/wp-json/custom_user_details/1998").map(res => res.json()).subscribe(data => {
                                //   console.log("membership---->",this.membership);
                                   // console.log(data);
                                    this.membership = data[0];
    
    
                       },
                          );
                        });
    
    }

   sharefb(){

    var url = "https://www.facebook.com/Aspen-Weather-122081124509650/";
    window.open(url, '_system', 'location=yes');        
  return true;
   // "https://www.facebook.com/Aspen-Weather-122081124509650/"

  }
  sharetw(){
    var url = "https://twitter.com/search?q=%40weatheraspen&src=typd";
    window.open(url, '_system', 'location=yes');        
  return true;
   // "https://twitter.com/search?q=%40weatheraspen&src=typd"
  }

  changePage(href,params) {
   if(this.membership == "subscriber" && params != '9')
   {
    this.navCtrl.push(MembershipOptionsPage);
   }
   else if(params=="12")
   {
   this.navCtrl.push(TermPage);
   }else if(params == "13")
   {
   this.navCtrl.push(PrivacypolicyPage);
   }
   else if(params=="8"){
      this.navCtrl.push(MembershipOptionsPage,{id:params});
     
      console.log("navigation---->",href,params)}
      else if(params=="9"){
        this.navCtrl.push(LoginPage,{id:params});
        console.log("navigation---->",href,params)
      }
      else if(params=="10"){
        if(this.membership == "s2member_level1")
        {
           //this.navCtrl.push(AlertsPage);
           this.useralert_info();
        }else{
        this.navCtrl.setRoot(WebcamPage,{id:params});
        console.log("navigation---->",href,params)
        }
      }
      else
      {
        //console.log('chagepage-->',this.membership);
        if(this.membership == "s2member_level1" && params == '1')
        {
          // this.navCtrl.push(AlertsPage);
          this.useralert_info();
        }
       else{
        this.navCtrl.push(WeatherPage,{id:params});
        console.log("navigation---->",href,params)}
      }
    

  }
  checkactive(page) {
    
   return page === this.activePage;

  }

  ionViewDidLoad() {
    
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'ASPEN WEATHER',
      message: 'Do you want to Logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
           
          }
        },
        {
          text: 'Sign Out',
          handler: () => {
            this.logout();
           
          }
        }
      ]
    });
    alert.present();
  }

}
