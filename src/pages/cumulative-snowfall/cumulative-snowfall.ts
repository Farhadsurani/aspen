import { Component } from '@angular/core';
import { IonicPage,NavController, NavParams } from 'ionic-angular';
import { HeaderComponent } from '../header/header.component';
import { ConfigUrls } from '../../config/config';
import { Http } from '@angular/http';

/**
 * Generated class for the CumulativeSnowfallPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-cumulative-snowfall',
  templateUrl: 'cumulative-snowfall.html',
})
export class CumulativeSnowfallPage {

   header : any;
   ads_data:any = {};
   apiData:any = {};
  snowmass ="";
  buttermilk ="";
  highlands = "";
  ajax = "";
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
                                          stepSize: 50,
                                          fontColor: "#fff", // this here
                              },
                              gridLines: {
                                      zeroLineColor:"rgba(255,255,255,0.5)"
                                    }
                          }],
                          xAxes: [{
                              ticks: {
                                          fontColor: "#fff", // this here
                              }
                              ,
                                                            gridLines: {
                                                                    zeroLineColor:"rgba(255,255,255,0.5)"
                                                                  }
                          }]
                      }
    };
    public barChartLabels:string[] = ['Snowmass', 'Buttermilk', 'Highlands', 'Ajax'];
    public barChartType:string = 'bar';
    public barChartLegend:boolean = false;
public values()
{
  this.http.get(ConfigUrls.CumulativeSnowfallPage).map(res => res.json()).subscribe(data => {

    console.log("sowmass------",data.snowmass)
    this.snowmass = data.snowmass;
    this.buttermilk = data.buttermilk;
    this.highlands = data.highlands;
    this.ajax = data.ajax;
  });
}

    public barChartData:any[] = [
      {
        
        data: [this.snowmass,this.buttermilk,this.highlands,this.ajax], label: 'Snowfall'},//
    ];
    public chartColors: any[] = [
          {
            backgroundColor:"#24406c",
            borderColor: '#24406c',
            borderWidth: 1
           }];

    // events
    public chartClicked(e:any):void {
      // console.log(e);
    }

    public chartHovered(e:any):void {
      // console.log(e);
    }

  constructor(public navCtrl: NavController, public navParams: NavParams,private http: Http) {
      this.header={ismenu:true,ishome:false,share:true};
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CumulativeSnowfallPage');
    this.getads();
    this.getCumulativeSnowfall();
    this.values();
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
  getCumulativeSnowfall()
  {
    this.http.get(ConfigUrls.CumulativeSnowfallPage).map(res => res.json()).subscribe(data => {
                      
      console.log(data);
                      
                 this.apiData = data;        
              

                       },
                            err => {
                               
                            
                        });

  }

}
