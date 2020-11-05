import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HeaderComponent } from '../header/header.component';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { ConfigUrls } from '../../config/config';
import { Alert_page } from '../../config/alerts';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { WeatherPage } from '../../pages/weather/weather';

/**
 * Generated class for the Card page.
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'cardPage',
  templateUrl: 'card.html',
})
export class cardPage {
  header : any;
  Updateprice = "";
  membership ="";
  userID ="";
  firstname ="";
  lastname ="";
  card :any = {};
 UPDATEDmembership ="";
  transtionID ="";
 
  payment_data : any = {};
 
  constructor(private alertCtrl: AlertController,public appServiceProvider : AppServiceProvider,private storage: Storage,public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.header={ismenu:true,ishome:true,share:true};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Card');
    
    this.Updateprice = this.navParams.get('param1');
    this.UPDATEDmembership = this.navParams.get('param2');
    this.membershipLoadData();
   
  }


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



 postCall()
 {
  
    let body = new FormData();
    body.append('user_id',this.userID);
    body.append('curr_user_role',this.membership);
    body.append('update_user_role',this.UPDATEDmembership);
   
    body.append('subscr_id',this.transtionID);
    // let options = new RequestOptions{ headers: headers });
  
    console.log('transion post',this.transtionID);
    this.http
        .post('http://79.170.44.115/stagedev.com/aspen/user_auth.php', body)
        .map(res => res.json())
        .subscribe(
            data => {
               console.log(data);
            },
            err => {
              console.log("ERROR!: ", err);
            }
        );
  }


  presentAlert(subTitle) {
    let alert = this.alertCtrl.create({
      title: 'Aspen Weather',
      subTitle: subTitle,
      buttons: ['Dismiss']
    });
    alert.present();
  }
  

 

  pay() 
  {


    if(!this.card.hasOwnProperty("number")){
      this.appServiceProvider.showAlert(Alert_page.enter_cardnumber);
      return;
     }
else if(!this.card.hasOwnProperty("expMonth")){
  this.appServiceProvider.showAlert(Alert_page.enter_expMonth);
  return;
}
 else if(!this.card.hasOwnProperty("expYear")){
  this.appServiceProvider.showAlert(Alert_page.enter_expYear);
  return;
}
else if(!this.card.hasOwnProperty("cvc")){
  this.appServiceProvider.showAlert(Alert_page.enter_cvc);
  return;
}

 else  if(!this.card.hasOwnProperty("StreetAddress")){
      this.appServiceProvider.showAlert(Alert_page.enter_StreetAddress);
     return;
 }
 else if(!this.card.hasOwnProperty("City")){
      this.appServiceProvider.showAlert(Alert_page.enter_City);
     return;
 }else if(!this.card.hasOwnProperty("State")){
      this.appServiceProvider.showAlert(Alert_page.enter_State);
     return;
 }

 else if(!this.card.hasOwnProperty("Postal")){
      this.appServiceProvider.showAlert(Alert_page.enter_Postal);
     return;
 }
else if(!this.card.hasOwnProperty("Country")){
      this.appServiceProvider.showAlert(Alert_page.enter_Country);
     return;
 }

    this.appServiceProvider.presentLoading();
  var data =    {
    "createTransactionRequest": {
        "merchantAuthentication": {
            "name": "3FEqfC2Fw7GH",//"6RFnx32eUmq",
            "transactionKey": "4t3V468NQqcLgx9h",//"32gS3P9j7ky5nkZ2"
        },
        "refId": "",
        "transactionRequest": {
            "transactionType": "authCaptureTransaction",
            "amount":this.Updateprice,
            "payment": {
                "creditCard": {
                    "cardNumber":this.card.number,
                    "expirationDate": this.card.expYear+'-'+this.card.expMonth,
                    "cardCode": this.card.cvc
                }
            },
           
            "billTo": {
                "firstName": this.firstname,
                "lastName":  this.lastname,
                "company": "",
                "address": this.card.StreetAddress,
                "city":  this.card.City,
                "state":  this.card.State,
                "zip":  this.card.Postal,
                "country":  this.card.Country
            },
            
            "customerIP": "192.168.1.1",
           
        }
    }
}
      var headers = new Headers();
      headers.append('Conent-Type', 'application/json');
    
      this.http.post('https://apitest.authorize.net/xml/v1/request.api', data, { headers: headers }).map(res => res.json())
      .subscribe(
          data => {
             console.log(data);
             this.appServiceProvider.hideLoading();
             let transId =  data.transactionResponse.transId
             console.log("transId is ======>>>>",transId);
             this.transtionID = data.transactionResponse.transId;
       
       
                let resultCode =  data.messages.resultCode
            console.log("resultCode is ======>>>>",resultCode);

            if (resultCode == "Error") 
            {

      let alert = this.alertCtrl.create({
        title: 'Aspen Weather',
        subTitle: "Your card number is not valid or expired. Please enter a valid card details.",
        buttons: [
          {
            text: 'Dismiss',
            handler: () => {
             
            }
          }
        ]
      });
      alert.present();

    }
            
else
{

 let responseCode =  data.transactionResponse.responseCode
      console.log("responseCode is ======>>>>",responseCode);

       if (responseCode == 1) {
          
             this.postCall();
        console.log("statusText  ID",data.statusText)
        console.log("status ID",data.status)
        console.log("type ID",data.type)
        
   
      let body =  data["_body"];

      this.payment_data = body;

    
      let alert = this.alertCtrl.create({
        title: 'Aspen Weather',
        subTitle: data.transactionResponse.messages[0].description,
        buttons: [
          {
            text: 'Dismiss',
            handler: () => {
              this.navCtrl.push(WeatherPage);
            }
          }
        ]
      });
      alert.present();

  
      }
      else
      {
        this.appServiceProvider.hideLoading();
        let alert = this.alertCtrl.create({
          title: 'Aspen Weather',
          subTitle: data.transactionResponse.errors[0].errorText,
          buttons: [
            {
              text: 'Dismiss',
              handler: () => {
               
              }
            }
          ]
        });
        alert.present();

        
      }
    }
    
    

          },
          err => {
            this.appServiceProvider.hideLoading();
            console.log("ERROR!: ", err);
            let alert = this.alertCtrl.create({
              title: 'Aspen Weather',
              subTitle: "Please Enter Valid Details",
              buttons: [
                {
                  text: 'Dismiss',
                  handler: () => {
                   
                  }
                }
              ]
            });
            alert.present();

              }
      );

      
        
     
  }



  userMetaData(){
    //  this.appServiceProvider.presentLoading();
      this.http.get(ConfigUrls.baseUrl + ConfigUrls.usermetadata + ConfigUrls.authtoken).map(res => res.json()).subscribe(data => {
                         //   this.appServiceProvider.hideLoading();
                            if(data.status == 'ok'){
                                  this.firstname = data.firstName;
                                  this.lastname = data.lastName;
                                 
                             }
                             else
                                  this.appServiceProvider.showAlert(data.error );

                           },
                                err => {
                                    this.appServiceProvider.hideLoading();
                                   this.appServiceProvider.showAlert(err.status );

                            });

   }
    
}