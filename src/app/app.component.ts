import { Component, ViewChild } from '@angular/core';
import {  Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { WeatherPage } from '../pages/weather/weather';
import { ConfigUrls } from '../config/config';
import { AppServiceProvider } from '../providers/app-service/app-service';
import { CumulativeSnowfallPage } from '../pages/cumulative-snowfall/cumulative-snowfall';
import { cardPage } from '../pages/card/card';
import { aboutUSPage } from '../pages/aboutUS/aboutUS';
import { OneSignal } from '@ionic-native/onesignal';
import { timer } from 'rxjs/observable/timer';
import { Http } from '@angular/http';
//import { InAppPurchase } from '@ionic-native/in-app-purchase';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  activePage: any;
 first =0;

  constructor(private OneSignal: OneSignal,public platform: Platform, public statusBar: StatusBar,
  public splashScreen: SplashScreen, public appServiceProvider : AppServiceProvider,public oneSignal: OneSignal,public http:Http) {
    this.initializeApp();
    //this.statusBar.hide();
    
    //this.splashScreen.hide();
   
    
  }



  initializeApp() {

   
    this.platform.ready().then(() => {

      // setTimeout(() => {
              
              this.statusBar.overlaysWebView(false);
              this.statusBar.backgroundColorByHexString('#000000');
              //this.statusBar.
               
              
             //timer(3000).subscribe(() => this.showSplash = false)
               this.appServiceProvider.getAuthkey().then(token => {
                                        console.log(token);
                                        
                                        if(token == '')
                                        this.rootPage = LoginPage;
                                  else{
                                        ConfigUrls.authtoken = token;
                                        this.rootPage = WeatherPage;
                                  }
                                  setTimeout(() => {
                                    this.splashScreen.hide();
                                  },3000);

 // Here you places data we collect in step 0:07 
 this.oneSignal.startInit('ffc0da08-6c3a-43d8-a7dd-2b1eb72f6c82');

 this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
 
 this.oneSignal.handleNotificationReceived().subscribe(() => {
  // do something when notification is received

  
 });
 
 this.oneSignal.handleNotificationOpened().subscribe(() => {
   // do something when a notification is opened
 
 });
 
 this.oneSignal.endInit();

                                     
               });
      // }, 100);
    });

    

  }

  

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
    this.activePage = page;
  }
}
