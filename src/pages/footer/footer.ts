import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { HeaderComponent } from '../header/header.component';
import { ConfigUrls } from '../../config/config';
/**
 * Generated class for the Card page.
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'footerPage',
  templateUrl: 'footer.html',
})
export class footerPage {
  header : any;
  apiData:any = {};
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.header={ismenu:true,ishome:true,share:true};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Card');
    this.getads();
  }

  getads()
  {
   
    this.http.get(ConfigUrls.getAdsUrl).map(res => res.json()).subscribe(data => {
                      
        this.apiData = data;
      console.log(data);
                       console.log("adssss",data[0]);
                       console.log("",data[0].image);
                       console.log("",data[1].image);
                       console.log("",data[2].image);
                       console.log("",data[3].image);
                       console.log("",data[4].image);
                       console.log("adsssrfhgrtuyuyys",data[5].image);



                       console.log("",data[0].bannercode);
                       console.log("",data[1].bannercode);
                       console.log("",data[2].bannercode);
                       console.log("",data[3].bannercode);
                       console.log("",data[4].bannercode);
                       console.log("adsssrfhgrtuyuyys",data[5].bannercode);
                         
                        

                       },
                            err => {
                               
                            
                        });

  }

   urlify(text) {
    var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
    //var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function(url,b,c) {
        var url2 = (c == 'www.') ?  'http://' +url : url;
        return '<a href="' +url2+ '" target="_blank">' + url + '</a>';
       //return '';
    }) 
}
    
}