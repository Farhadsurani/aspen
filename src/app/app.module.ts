import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { OneSignal } from '@ionic-native/onesignal';

import { MyApp } from './app.component';
//import { HomePage } from '../pages/home/home';
//import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { TermsPage } from '../pages/terms/terms';
import { CreateAccountPage } from '../pages/create-account/create-account';
import { JoinNowPage } from '../pages/join-now/join-now';
import { MembershipOptionsPage } from '../pages/membership-options/membership-options';
import { WeatherPage } from '../pages/weather/weather';
import { WebcamPage } from '../pages/webcam/webcam';
import { CamviewPage } from '../pages/camview/camview';
import { CumulativeSnowfallPage } from '../pages/cumulative-snowfall/cumulative-snowfall';
import { NavigationPage } from '../pages/navigation/navigation-component';
import { AirportPage } from '../pages/airport/airport';
import { HeaderComponent } from '../pages/header/header.component';
import { FooterComponent } from '../pages/footer/footer.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppServiceProvider } from '../providers/app-service/app-service';
import { HttpModule } from '@angular/http';
import {ChartsModule} from 'ng2-charts/charts/charts';
import {IonicStorageModule} from '@ionic/storage';
import { cardPage } from '../pages/card/card';
import '../../node_modules/chart.js/dist/Chart.bundle.min.js';
import { Stripe } from '@ionic-native/stripe';
import { accountPage } from '../pages/account/account';//footerPage
import { aboutUSPage } from '../pages/aboutUS/aboutUS';//
import { footerPage } from '../pages/footer/footer';//
import { DatePipe } from '@angular/common'
import { AlertsPage } from '../pages/alerts/alerts';
import {TermPage } from '../pages/term/term';
import { PrivacypolicyPage } from '../pages/privacypolicy/privacypolicy';
import { InAppPurchase } from '@ionic-native/in-app-purchase';
@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    CreateAccountPage,
    JoinNowPage,
    MembershipOptionsPage,
    WeatherPage,
    WebcamPage,
    CamviewPage,
    aboutUSPage,
    NavigationPage,
    AirportPage,
    CumulativeSnowfallPage,
    HeaderComponent,
    cardPage,
    accountPage,
    FooterComponent,
    AlertsPage,
    TermsPage,
    TermPage,
    PrivacypolicyPage,

  ],
  imports: [
    BrowserModule,
    HttpModule,
    ChartsModule,
    IonicModule.forRoot(MyApp),
     IonicStorageModule.forRoot()

  ],
  bootstrap: [IonicApp],
  entryComponents: [
        MyApp,
        LoginPage,
        CreateAccountPage,
        JoinNowPage,
        MembershipOptionsPage,
        WeatherPage,
        WebcamPage,
        CamviewPage,
        NavigationPage,
        aboutUSPage,
        AirportPage,
        cardPage,
        accountPage,
        CumulativeSnowfallPage,
        HeaderComponent,
        FooterComponent,
        AlertsPage,
        TermsPage,
        TermPage,
        PrivacypolicyPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Stripe,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AppServiceProvider,
    OneSignal,
    DatePipe,
    InAppPurchase
  ]
})
export class AppModule {}
