import { Component,ViewChild } from '@angular/core';
import { IonicPage,NavController,NavParams, ModalController,Slides, Platform } from 'ionic-angular';
import { ConfigUrls } from '../../config/config';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import { AirportPage } from '../../pages/airport/airport';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { MembershipOptionsPage } from '../../pages/membership-options/membership-options';
import { OneSignal } from '@ionic-native/onesignal';
import { Alert_page } from '../../config/alerts';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../../pages/login/login';
import { CumulativeSnowfallPage } from '../../pages/cumulative-snowfall/cumulative-snowfall';
import { AlertsPage } from '../../pages/alerts/alerts';
import * as $ from 'jquery'
import { DatePipe } from '@angular/common';

/**
 * Generated class for the WeatherPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-weather',
  templateUrl: 'weather.html',
})
export class WeatherPage {
  dayone : any;
  daytwo: any;
  daythree: any;
  dayfour: any;
  dayfive: any;
  daysix: any;
  public stromChartData: any=[];
  threeimg1 = "";
  threeimg2 = "";
  threeimg3 = "";
  date: any;
 first = "";
 second = "";
 thired = "";
  header : any;
  currentIndex = 0;
  membership ="";
  calenderdata : any={};
  weather_data_current : any = {};
  weather_data_hours : any = {};
  weather_data_days : any = {};
  powderforecast_data : any =  {};
  forecast_discussion_arr : any =  {};
  airportdelay_data : any =  {};
  weather_data : any = {};
  membership_data : any = {};
  Usermembership_data : any;
  weather_data_attachments : {} = {};
  weatherDiscussion_data : any =  [];

  getweatherCurrent_data : any = {};
  getweatherHours_data : any = {};
  getweatherForcast_data : any = {};
  get_t_storm_prediction_data : any = {};
  ads_data : any = {};
  currentweather : any = "";
  feelweather : any = "";
  wind : any = "";
  apiData:any = {};
  stromapiData:any = {};
  threeDayApiData:any = {};
  UVapiData:any = {};


  hour1 : any = "";
  hour2 : any = "";
  hour3 : any = "";
  hour4 : any = "";
  hour5 : any = "";
  hour6 : any = "";

  hour7 : any = "";
  hour8 : any = "";
  hour9 : any = "";
  hour10 : any = "";
  hour11 : any = "";
  hour12 : any = "";
Delay1:any="";
Delay2:any="";
Delay3:any="";
snowmass ="";
buttermilk ="";
highlands = "";
ajax = "";
  @ViewChild(Slides) slides: Slides;

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true,
    showInlineValues : true,
    centeredInllineValues : true,
                tooltipCaretSize : 0,
                 showTooltips : false,
    showLabelsOnBars:true,
    barLabelFontColor:"gray",
    
    tooltips: {
                mode: 'single',
            },
    scaleFontColor: 'red',
    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true,
                                        mirror:false,
                                        suggestedMin: 0,
                                        suggestedMax:300,
                                        stepSize: 50,
                                        fontColor: "#fff", // this here
                            },
                            gridLines: {
                                    zeroLineColor:"rgba(255,255,255,0.5)"
                                  }
                        }],
                        xAxes: [{
                            ticks: {
                                        fontColor: "#fff",fontSize:10, // this here
                            }
                            ,
                                                          gridLines: {
                                                                  zeroLineColor:"rgba(255,255,255,0.5)"
                                                                }
                        }]
                    }
                    
  };
  public strombarChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true,
    showInlineValues : true,
    axisY: {
      suffix: "%",  
     },
     scaleLabel: function (valuePayload) {
      return valuePayload + '%';
  },
    centeredInllineValues : true,
                tooltipCaretSize : 0,
                 showTooltips : false,
    showLabelsOnBars:true,
    barLabelFontColor:"gray",
    tooltips: {
                mode: 'single',
            },
    scaleFontColor: 'red',
    scales: {
                        yAxes: [{
                            ticks: {
                              suffix: "%",  
                                beginAtZero:true,
                                        mirror:false,
                                        suggestedMin: 0,
                                       // suggestedMax:100,
                                       max :100,
                                        stepSize:10,
                                        fontColor: "#fff", // this here
                            },
                            gridLines: {
                                    zeroLineColor:"rgba(255,255,255,0.5)"
                                  }
                        }],
                        xAxes: [{
                            ticks: {
                                        fontColor: "#fff", fontSize: 10, // this here
                            }
                            ,
                                                          gridLines: {
                                                                  zeroLineColor:"rgba(255,255,255,0.5)"
                                                                }
                        }]
                    }
                    
  };
  
  public barChartLabels:string[] = ['SNOWMASS','BUTTERMILK','HIGHLANDS','AJAX'];
  public snowChartLabels:string[] = ['Noon- 3pm', '3pm-6pm', '6pm- 9pm'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = false;

  public values()
  {
    
  }

  
  //public stromChartData:any[] = [
    //{data: [0,0,0], label: 'Chance'},//
  //];
  public chartColors: any[] = [
        {
          backgroundColor:"#27aae1",
          borderColor: '#27aae1',
          borderWidth: 1
         }];

  // events
  public chartClicked(e:any):void {
    // console.log(e);
  }

  // public formattedValues = {labelFormatter : this.formatYValues};

  // public formatYValues(e) {
  //   return e.value + '%';
  // }

  public chartHovered(e:any):void {
    // console.log(e);
  }

  constructor(public datepipe: DatePipe,private storage: Storage,private oneSignal: OneSignal,private navCtrl: NavController,private platform :Platform,public navParams: NavParams,private http: Http,private modalCtrl : ModalController,private appServiceProvider : AppServiceProvider) {
    this.membershipLoadData();
        this.header={ismenu:true,ishome:true,share:true};
        this.http.get(ConfigUrls.MembershipService+ConfigUrls.userID).map(res => res.json()).subscribe(data => {
        
       //this.membershipLoadData();
       //console.log("membership---------->",this.membership);
       //this.values();
       //this.http.get("https://aspenweather.net/api/?json=get_nonce&controller=user&method=register").map(res => res.json()).subscribe(data1 => {});
      
       this.http.get("https://aspenweather.net/api/get_page/?id=5196").map(res => res.json()).subscribe(data => {
         console.log("demo....",data.status);
        
         this.first = data.page.custom_fields.noon3pm;
         this.second = data.page.custom_fields.t3pm6pm;
         this.thired = data.page.custom_fields.t6pm9pm;
         this.stromChartData = [
          {data: [this.first,this.second,this.thired], label: 'Chance'},
          ]; 
         
       /* console.log("sowmass------",data.page.custom_fields.snowmass)
        this.snowmass = data.page.custom_fields.snowmass;
        this.buttermilk = data.page.custom_fields.buttermilk;
        this.highlands = data.page.custom_fields.highlands;
        this.ajax = data.page.custom_fields.ajax;
        this.http.get("https://aspenweather.net/api/get_page/?id=644").map(res => res.json()).subscribe(data => {
        

          this.first = data.page.custom_fields.noon3pm;
          
         });*/ 
          
      });
     
      //console.log("constructer..........",this.snowmass);

      /*this.http
      .get('https://aspenweather.net/user-auth/?user_id=4691&curr_user_role=s2member_level1&update_user_role=s2member_level3&subscr_id=1562397')
      .map(res => res.json())
      .subscribe(
          data => {
             if(data.status == "ok")
             {
               this.appServiceProvider.showAlert("Your Mumbership is upgraded");
             }
             else
             {
              this.appServiceProvider.showAlert("Your Mumbership is upgraded");
             }
          },
          err => {
            console.log("ERROR!: ", err);
            this.appServiceProvider.showAlert(err);
          }
      );*/

      

      });
     
      
      this.stromChartData = [
        {data: [this.first,this.second,this.thired], label: 'Chance'},
        ]; 

      this.storage.get('userID').then((val) => {
        console.log("go to login page1",val);
              if(val == null)
              {
                console.log("go to login page..");
                this.navCtrl.push(LoginPage);
              }
      });
      this.http.get("https://aspenweather.net/api/?json=get_nonce&controller=user&method=register").map(res => res.json()).subscribe(nonce_check => {
      console.log('nonce.........',nonce_check.nonce);
      });

     /*this.http.get("https://aspenweather.net/api/get_page/?id=271").map(res => res.json()).subscribe(data => {

        console.log("sowmass------",data.page.custom_fields.snowmass)
        this.snowmass = data.page.custom_fields.snowmass;
        this.buttermilk = data.page.custom_fields.buttermilk;
        this.highlands = data.page.custom_fields.highlands;
        this.ajax = data.page.custom_fields.ajax;

        console.log("snowmass---",this.snowmass);
        console.log("buttermilk---",this.buttermilk);
        console.log("highlands---",this.highlands);
        console.log("ajax---",this.ajax);
      });*/
     
  }
  public valued()
{
  this.http.get(ConfigUrls.CumulativeSnowfallPage).map(res => res.json()).subscribe(data => {

    
    this.snowmass = data.page.custom_fields.snowmass;
        this.buttermilk = data.page.custom_fields.buttermilk;
        this.highlands = data.page.custom_fields.highlands;
        this.ajax = data.page.custom_fields.ajax;
        console.log("sowmass------",this.snowmass);
        this.barChartData = [
          {data: [this.snowmass,this.buttermilk,this.highlands,this.ajax], label: 'Snowfall'},//
        ];
  });
}

     public barChartData:any[] = [
    {data: [this.snowmass,this.buttermilk,this.highlands,this.ajax], label: 'Snowfall'},//
  ];   
  
   

 /* ngOnInit()
  {
    this._postService.getparams("").subscribe();
  }*/
  ionViewDidLoad() {
    this.valued();
    this.getthreedayOutlet();
   // this.getUVOUTLOOK();
    //this.currentIndex = 0;
    this.getads();
    this.membershipLoadData();
     this.getPUSH();
     this.getweatherDays();
     this.getweatherCurrent();
     this.getweatherHours();
    
     //this.calender();
     setTimeout(() => {
       console.log("get  t-storm.............");
      // this.navCtrl.popToRoot();
      // might try this instead
      //this.navCtrl.setRoot(page);
      this.get_t_storm_prediction();
  }, 400000);
    // this.get_t_storm_prediction();
     
  
console.log("snowmass------------>",this.snowmass)
   //  console.log( ConfigUrls.authtoken);
  //  console.log( ConfigUrls.authtoken);
    
    //   this.http.get(ConfigUrls.MembershipService+ConfigUrls.userID).map(res => res.json()).subscribe(membershipdata => {
    //   console.log("membershipdata-------------->",JSON.stringify(membershipdata.json()));
    //  // this.membership = "subscriber";
    //   this.membership = membershipdata[0];
    //   // this.membership = this.Usermembership_data.children(1);
    
    //     console.log("Usermembership_data ",this.membership);
    //   //  console.log("Usermembership_data.children ",this.Usermembership_data.children(1));
    //     console.log("-------------->this is the role:",this.membership);

    // }, error => {
    //     console.log(JSON.stringify(error.json()));
    // });

      let page = this.navParams.get('id');

      if(page == undefined)
         this.fetchForecast(ConfigUrls.weatherpage);
         
      else
          setTimeout(()=>
             {
               this.goToSlide(page);
             },500);


             

  }

 
  weatherDiscussion(){
   
    this.slides.slideNext(1);
    
  }
  airport_status_info(){

      let airportmodal = this.modalCtrl.create(AirportPage);
          airportmodal.present();
  }
useralert_info()
{
  let useralert = this.modalCtrl.create(AlertsPage);
  useralert.present();
}
  slideChanged(){

      this.currentIndex = this.slides.getActiveIndex();
      console.log('Current index is', (this.currentIndex));
      console.log("membership",this.membership);
      if(this.membership == "subscriber")
      {
        this.navCtrl.push(MembershipOptionsPage);
      }
      else if(this.currentIndex == 0){
           if(this.isArrayEmpty(this.weather_data))
                    this.fetchForecast(ConfigUrls.weatherpage);
                    
                   // console.log(this.weather_data);
                  //  this.getweatherCurrent();
                  //  this.getweatherHours();
                  //  this.getweatherDays();
      }else if(this.currentIndex == 1){
        console.log("index page 1....");
        if(this.membership == "s2member_level1")
        {
          console.log("s2member_level1");
         // this.navCtrl.push(AlertsPage);
         this.useralert_info();
        }else{
        if(this.isArrayEmpty(this.forecast_discussion_arr))
        this.getforecast_discussion();}
        //this.getforecast_discussion(ConfigUrls.forecast_discussion);
       // console.log(this.forecast_discussion_arr);
      }/*else if(this.currentIndex == 2){
            if(this.isArrayEmpty(this.powderforecast_data))
                           this.fetchForecast(ConfigUrls.powder_forecast);
                          console.log("powderforecast:",this.powderforecast_data);
                            //this.powderforecast();
      }*/
      else if(this.currentIndex == 2){
            if(this.isArrayEmpty(this.airportdelay_data))
                                      this.getairportdelay();
      }
      //else if(this.currentIndex == 4)
      //{
      // this.get_t_storm_prediction();
     // }
      //else if(this.currentIndex == 5)
     // {
          //   this.getUVOUTLOOK(); 
             
     // }
    //  else if(this.currentIndex == 6)
    //  {
       //   this.getthreedayOutlet();
    //  }
     
     else if(this.currentIndex == 3){
        if(this.isArrayEmpty(this.get_t_storm_prediction_data))
                                  this.get_t_storm_prediction();
 }
  else if(this.currentIndex == 4){
    if(this.isArrayEmpty(this.threeDayApiData))
                               this.getthreedayOutlet();
}
else if(this.currentIndex == 5){
  if(this.isArrayEmpty(this.UVapiData))
                            this.getUVOUTLOOK();
}


  }


  getads()
  {
   
    this.http.get(ConfigUrls.getAdsUrl).map(res => res.json()).subscribe(data => {
                      
     // console.log(data);
    

                 this.ads_data = data;   
                 
                 var ad0 = data[0].bannercode;

             ad0 = ad0.replace('\\&quot; target=\\&quot;_blank\\&quot;&gt;&lt;img src=\\&quot;%asset%\\&quot; /&gt;&lt;/a&gt;','');
             ad0 = ad0.replace('&lt;a href=\\&quot;','');

             console.log('adddd------>',ad0);

             var ad1 = data[1].bannercode;

             ad1 = ad1.replace('\\&quot; target=\\&quot;_blank\\&quot;&gt;&lt;img src=\\&quot;%asset%\\&quot; /&gt;&lt;/a&gt;','');
             ad1 = ad1.replace('&lt;a href=\\&quot;','');

             console.log('adddd1------>',ad1);

             var ad2 = data[2].bannercode;

             ad2 = ad2.replace('\\&quot; target=\\&quot;_blank\\&quot;&gt;&lt;img src=\\&quot;%asset%\\&quot; /&gt;&lt;/a&gt;','');
             ad2 = ad2.replace('&lt;a href=\\&quot;','');

             console.log('adddd2------>',ad2);


             var ad3 = data[3].bannercode;

             ad3 = ad3.replace('\\&quot; target=\\&quot;_blank\\&quot;&gt;&lt;img src=\\&quot;%asset%\\&quot; /&gt;&lt;/a&gt;','');
             ad3 = ad3.replace('&lt;a href=\\&quot;','');

             console.log('adddd3------>',ad3);
             var ad4 = data[4].bannercode;

             ad4 = ad4.replace('\\&quot; target=\\&quot;_blank\\&quot;&gt;&lt;img src=\\&quot;%asset%\\&quot; /&gt;&lt;/a&gt;','');
             ad4 = ad4.replace('&lt;a href=\\&quot;','');

             console.log('adddd4------>',ad4);
              

                       },
                            err => {
                               
                            
                        });

  }

    
  goToSlide(page) {
      if(page == 0)
      {
         console.log("membership-------------->",this.membership);
          this.fetchForecast(ConfigUrls.weatherpage);
      }

       else{
          this.slides.slideTo(page,500);
       }
  }

  fetchForecast(rel_url : string){

        this.appServiceProvider.presentLoading();
        this.http.get(ConfigUrls.baseUrl + rel_url).map(res => res.json()).subscribe(data => {

                      //  console.log(data);
                        if(data.status == "ok")
                        {
                                    if(this.currentIndex == 0)
                                    {
                                      this.appServiceProvider.hideLoading();
                                       this.weather_data = data.page;
                                     //  console.log(this.weather_data);

                                       this.addAttachments(this.weather_data.attachments);
                                       
                                        
                                      if(this.membership == "s2member_level1")
                                      {
                                        //this.navCtrl.push(MembershipOptionsPage);
                                      }
                                      else if(this.membership == "subscriber")
                                      {
                                        this.navCtrl.push(MembershipOptionsPage);
                                      }
                                      else if(this.membership == "s2member_level2")
                                      {
                                       // this.navCtrl.push(MembershipOptionsPage);
                                      }
                                      else if(this.membership == "s2member_level3")
                                      {
                                       // this.navCtrl.push(MembershipOptionsPage);
                                      }
                                      else
                                      {

                                      }
                                     
                                   }
                                   else if(this.currentIndex == 1){
                                    data.page=data.page.replace('<p>&nbsp;</p>',' ')
                                    this.forecast_discussion_arr = data.page;
                                   }
                                   /*else if(this.currentIndex == 2){
                                         this.powderforecast_data = data.page.custom_fields;
                                         let day1 = this.powderforecast_data.date1;
                                         let  dayy = day1;
                                         
                                         console.log("powerforecast date:",dayy);

                                         day1 = new Date();
                                         let day2 =new Date();
                                         let day3 =new Date();
                                         let day4 =new Date();
                                         let day5 =new Date();
                                         let day6 =new Date();
                                        // console.log("dates of next day",day2.setDate(day2.getDate() + 1));
                                       day2.setDate(day2.getDate() + 1);
                                       day3.setDate(day3.getDate() + 2);
                                       day4.setDate(day4.getDate() + 3);
                                       day5.setDate(day5.getDate() + 4);
                                       day6.setDate(day6.getDate() + 5);
                                        this.dayone = this.datepipe.transform(day1, 'EEEE');
                                        this.daytwo = this.datepipe.transform(day2, 'EEEE');
                                        this.daythree = this.datepipe.transform(day3, 'EEEE');
                                        this.dayfour = this.datepipe.transform(day4, 'EEEE');
                                        this.dayfive = this.datepipe.transform(day5, 'EEEE');
                                        this.daysix = this.datepipe.transform(day6, 'EEEE');
                                        
                                   }*/
                                   else if(this.currentIndex == 2){
                                    this.membershipLoadData();
                                    this.airportdelay_data = data.page;
                                   }
                                  //  else if(this.currentIndex == 4){
                                  //   this.get_t_storm_prediction();
                                  //   this.get_t_storm_prediction_data = data.page;
                                  //  }
                                  //  else if(this.currentIndex == 5){
                                  //   this.getthreedayOutlet();
                                  //   this.threeDayApiData = data.page;
                                  //  }
                                  //  else if(this.currentIndex == 6){
                                  //   this.getUVOUTLOOK();
                                  //   this.UVapiData = data.page;
                                  //  }


                        }
                        this.appServiceProvider.hideLoading();

                 },
                      err => {
                          console.log("err!");
                          this.appServiceProvider.hideLoading();
                      });

     }

getforecast_discussion(){
  if(this.membership == "s2member_level1")
  {
    console.log("s2member_level1");
    this.navCtrl.push(AlertsPage);
  }
    this.appServiceProvider.presentLoading();
      this.http.get(ConfigUrls.baseUrl + ConfigUrls.forecast_discussion).map(res => res.json()).subscribe(data => {
                         
                          if(data.status == 'ok'){
                            // console.log(data);
                            var dataReplace=data.page;
                            
                            //var dataReplaced=dataReplace.replace('<p>&nbsp;</p>',' ')
                            this.forecast_discussion_arr = data.page;
                            
                         //   console.log({{forcast_discussion?.title}});
                           }
                           else{}
                           this.appServiceProvider.hideLoading();   

                         },
                              err => {
                                 
                                this.appServiceProvider.hideLoading();
                          });

 }


getairportdelay(){
 
    this.appServiceProvider.presentLoading();
      this.http.get(ConfigUrls.baseUrl + ConfigUrls.airportdelaypage).map(res => res.json()).subscribe(data => {
                         
                          if(data.status == 'ok'){
                            this.appServiceProvider.hideLoading(); 
                            // console.log(data);
                            this.airportdelay_data = data.page;
                          
                           }
                           else{}
                           this.appServiceProvider.hideLoading();   

                         },
                              err => {
                                 
                                this.appServiceProvider.hideLoading();
                          });

 }


     addAttachments(attachments_data : any){

        for (let attachment of attachments_data) {

            this.weather_data_attachments[attachment.id] = attachment;
        }
      //  console.log(this.weather_data_attachments);

     }

     isArrayEmpty(arr){

          return Object.keys(arr).length == 0;
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

   
     
    getweatherCurrent(){
      this.storage.get('userID').then((val) => {
         console.log('userID--------', val);
      
         
         
         
         
          this.storage.set('userID', val);
         //console.log("user details ----------->",this.appServiceProvider.getUserDetails);   
        //  this.http.get("https://aspenweather.net/wp-json/custom_user_details/1998?callback=parseResponse").map(res => res.json()).subscribe(data => {
         //https://aspenweather.net/wp-json/custom_user_details/1998?callback=parseResponse
  
         // console.log("https://aspenweather.net/wp-json/custom_user_details/" + val+"?callback=parseResponse");
          this.http.get("https://aspenweather.net/wp-json/custom_user_details/" + val +"?callback=parseResponse").map(res => res.json()).subscribe(data => {
          // this.http.get("http://79.170.44.115/stagedev.com/aspen/wp-json/custom_user_details/1998").map(res => res.json()).subscribe(data => {
                                  //   console.log("membership---->",this.membership);
                                     // console.log(data);
                                     // this.membership = data[0];
                                     console.log("hello__________________",data[0]);
                                   if(data[0] == "subscriber")
                                   {
                                     console.log("redirecting.........");
                                    this.navCtrl.push(MembershipOptionsPage);
                                   }
      
                         },
                            );
                          });
     // console.log("mamberships==========================>",this.membership);
      
      this.http.get("http://dataservice.accuweather.com/currentconditions/v1/332154?apikey=a6yx6CL07vXUENGLUJbAtTX0aryWEvGp&language=en-us&details=true").map(res => res.json()).subscribe(data => {
      
      
    //  console.log(data);
      this.weather_data_current = data;
   //   console.log(this.weather_data_current[0].WeatherText);
     
      this.currentweather = this.weather_data_current[0].Temperature.Imperial.Value;
      this.feelweather = this.weather_data_current[0].RealFeelTemperature.Imperial.Value;
      this.wind = this.weather_data_current[0].Wind.Speed.Imperial.Value;

     
      },
      err => {
      
      
      });

      
     
      }

      powderforecast(){
              this.http.get(ConfigUrls.powder_forecast).map(res =>res.json()).subscribe(data=> {
                //console.log("powerforecast",data.;
              });
      }
      getweatherHours(){
      
        
      this.http.get("http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/332154?apikey=a6yx6CL07vXUENGLUJbAtTX0aryWEvGp&language=en-us&details=true&metric=true").map(res => res.json()).subscribe(data => {
      
      
   
      this.weather_data_hours = data;
   
       
      this.hour1 = Math.round((this.weather_data_hours[0].Temperature.Value*9)/5+32);
      this.hour2 = Math.round((this.weather_data_hours[1].Temperature.Value*9)/5+32);
      this.hour3 =  Math.round((this.weather_data_hours[2].Temperature.Value*9)/5+32);
      this.hour4 =  Math.round((this.weather_data_hours[3].Temperature.Value*9)/5+32);
      this.hour5 =  Math.round((this.weather_data_hours[4].Temperature.Value*9)/5+32);
      this.hour6 =  Math.round((this.weather_data_hours[5].Temperature.Value*9)/5+32);

      this.hour7 = Math.round((this.weather_data_hours[6].Temperature.Value*9)/5+32);
      this.hour8 = Math.round((this.weather_data_hours[7].Temperature.Value*9)/5+32);
      this.hour9 =  Math.round((this.weather_data_hours[8].Temperature.Value*9)/5+32);
      this.hour10 =  Math.round((this.weather_data_hours[9].Temperature.Value*9)/5+32);
      this.hour11 =  Math.round((this.weather_data_hours[10].Temperature.Value*9)/5+32);
      this.hour12 =  Math.round((this.weather_data_hours[11].Temperature.Value*9)/5+32);
     
      },
      err => {
      
      
      });
     
      }
      getweatherDays(){
       
      this.http.get("http://dataservice.accuweather.com/forecasts/v1/daily/5day/332154?apikey=a6yx6CL07vXUENGLUJbAtTX0aryWEvGp&language=en-us&details=true").map(res => res.json()).subscribe(data => {
      
      
     // console.log(data);
      this.weather_data_days = data;
      
      //console.log(this.weather_data_days.DailyForecasts[0].Date.toLocaleDateString());
      // this.date1 = this.weather_data_days.DailyForecasts[0].Date().toISOString();
      },
      err => {
      
      
      });
     
      }

      getCumulativeSnowfall()
      {
        console.log("cumulationsnowfall............................................");
        this.appServiceProvider.presentLoading();
    this.http.get("https://aspenweather.net/api/get_page/?id=271").map(res => res.json()).subscribe(data => {

      this.snowmass = data.page.custom_fields.snowmass;
      this.buttermilk = data.page.custom_fields.buttermilk;
      this.highlands = data.page.custom_fields.highlands;
      this.ajax = data.page.custom_fields.ajax;
                      
      console.log("hello",this.snowmass);
                      
                 this.apiData = data;        
                 this.barChartData = [
                  {data: [this.snowmass,this.buttermilk,this.highlands,this.ajax], label: 'Snowfall'},//
                ];
                this.appServiceProvider.hideLoading();

                       },
                            err => {
                               
                            
                        });


    
      }

      get_t_storm_prediction()
      {
        
        
         // console.log("data is comming or not..",this.first);
        //this.appServiceProvider.presentLoading();
        console.log('hello this is t');
        this.stromChartData = [
          {data: [this.first,this.second,this.thired], label: 'Chance'},
          ]; 
        
          console.log("getting data from apis...",this.first);
       this.http.get(ConfigUrls.baseUrl + ConfigUrls.get_t_storm_prediction).map(res => res.json()).subscribe(data => {
                          
        console.log(data);
        console.log("get_t_storm.....");
       //this.appServiceProvider.hideLoading();
                    this.get_t_storm_prediction_data = data;        
                  
    
                          },
                               err => {
                                //this.appServiceProvider.hideLoading();     
                                
                           });
                         

    
      }
      getthreedayOutlet()
      {
        //this.appServiceProvider.presentLoading();
        this.http.get(ConfigUrls.baseUrl + ConfigUrls.THREEDAYOUTLOOKPage).map(res => res.json()).subscribe(data => {
                          
        console.log("3 day log---------->",data);
        //console.log("mem",this.membership);
       
                          
                     this.threeDayApiData = data.page.custom_fields;        
                  
                    // console.log("day_1_day",this.threeDayApiData.page.custom_fields[0].day_1_day);
                     //console.log("day_1_image",this.threeDayApiData.page.custom_fields[0].day_1_image);
                     //console.log("day_1_number",this.threeDayApiData.page.custom_fields[0].day_1_number);
                     //console.log("day_1_status_text",this.threeDayApiData.page.custom_fields[0].day_1_status_text);
                    //  console.log("",this.threeDayApiData.page.custom_fields.day_2_-_day);
                    //  console.log("",this.threeDayApiData.page.custom_fields.day_1_day);
                    let img1 = this.threeDayApiData.day_1_image;
                    let img2 = this.threeDayApiData.day_2_image;
                    let img3 = this.threeDayApiData.day_3_image;

                    this.http.get("https://aspenweather.net/wp-json/wp/v2/media/"+img1+"/").map(res => res.json()).subscribe(data =>{
                      console.log("images:",data.guid.rendered);
                       this.threeimg1 = data.guid.rendered;

                    });
                    this.http.get("https://aspenweather.net/wp-json/wp/v2/media/"+img2+"/").map(res => res.json()).subscribe(data =>{
                      console.log("images:",data.guid.rendered);
                       this.threeimg2 = data.guid.rendered;

                    });
                    this.http.get("https://aspenweather.net/wp-json/wp/v2/media/"+img3+"/").map(res => res.json()).subscribe(data =>{
                      console.log("images:",data.guid.rendered);
                       this.threeimg3 = data.guid.rendered;
                      
                    });
                   // this.appServiceProvider.hideLoading();
                           },
                                err => {
                              
                                 // this.appServiceProvider.hideLoading();
                            });
    
      }
      
      getUVOUTLOOK()
      {
        this.appServiceProvider.presentLoading();
        this.http.get(ConfigUrls.baseUrl + ConfigUrls.UVOUTLOOKPage).map(res => res.json()).subscribe(data => {
                          
      
       
       console.log("getvuoutlook");
                          
                     this.UVapiData = data;        
                  
                     console.log("excerpt  :",this.UVapiData.page.excerpt);
                     console.log("content  :",this.UVapiData.page.content);
                     console.log("uv_index_scale  :",this.UVapiData.page.custom_fields.uv_index_scale[0]);
                     this.values();
                     this.barChartData = [
                      {data: [this.snowmass,this.buttermilk,this.highlands,this.ajax], label: 'Snowfall'},//
                    ];   
                     console.log("values......",this.snowmass);
                     this.appServiceProvider.hideLoading();
                           },
                                err => {
                                   
                             
                            });
    
      }
      
      //snow fall calender

      /*calender()
      {
       
       // this.appServiceProvider.presentLoading();
        this.date=new Date();
        console.log("date of today",this.date);
 let latest_date =this.datepipe.transform(this.date, 'yyyy-MM');
 let lastest_date = latest_date + '01';
 console.log("date........",latest_date);
 
 this.appServiceProvider.presentLoading();   

        this.http.get("https://aspenweather.net/wp-json/tribe/events/v1/events?start_date="+latest_date+"&per_page=30").map(res => res.json()).subscribe(data => {
                          
          // console.log(data);
          
                      this.calenderdata = data.events;
                      console.log("events:",this.calenderdata.id);        
                   
                     this.appServiceProvider.hideLoading();
                            },

                                 err => {
                                    
                                 
                             });
      }*/
      
    
     getPUSH(){
      this.oneSignal.startInit('b2f7f966-d8cc-11e4-bed1-df8f05be55ba', '703322744261');

this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

this.oneSignal.handleNotificationReceived().subscribe(() => {
 // do something when notification is received
});

this.oneSignal.handleNotificationOpened().subscribe(() => {
  // do something when a notification is opened
});

this.oneSignal.endInit();

     }






     //IMAGE SLIDE

    //  slideUp(ev: any) {
    //   let currentIndex = this.slides._activeIndex;
    //   let slide = this.slideCtrl.create({
    //     ev: ev,
    //     list: this.imgSlides,
    //     index: currentIndex,
    //     change: this.changeCB.bind(this)
    //   });
    //   slide.present({
    //     ev: {
    //       data: ev,
    //       list: this.imgSlides,
    //       index: currentIndex,
    //       change: this.changeCB.bind(this)
    //     }
    //   });
    // }
  
    // changeCB(data: any) {
    //   this.slides.slideTo(data, 0);
    // }

}
