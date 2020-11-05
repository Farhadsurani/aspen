export class ConfigUrls {
  //  public static baseUrl='http://79.170.44.115/stagedev.com/aspen/api/';
   public static baseUrl='https://aspenweather.net/api/'; 
  public static login='auth/generate_auth_cookie/?nonce=836152a7a3&username=';
  public static register='user/register/?username=';
  public static forgotpassword='user/retrieve_password/?insecure=cool&user_login=';
  public static usermetadata='user/get_user_meta/?cookie=';
  public static powder_forecast='get_page/?id=53';
  public static forecast_discussion='get_page/?id=321';
  public static weatherpage='get_page/?id=274';
  public static airportdelaypage='get_page/?id=179';
  public static learnmorepage='get_page/?id=29';
  public static membershippage='get_page/?id=156';
  public static WebcamPage='get_page/?id=56';
  public static accountPage='get_page/?id=55';
  public static aboutUSPage='get_page/?id=65';//
  public static THREEDAYOUTLOOKPage='get_page/?id=636';
  public static UVOUTLOOKPage='get_page/?id=477';
  public static get_t_storm_prediction='get_page/?id=644';//
  public static CumulativeSnowfallPage='get_page/?id=271';
  public static SwitchApi='get_page/?id=51';
  public static MembershipService='https://aspenweather.net/wp-json/custom_user_details/'
  public static getNonceUrl='?json=get_nonce&controller=user&method=register';
  public static getAdsUrl='https://aspenweather.net/wp-json/custom_add_details/ad';
  public static getcurrentWeatherUrl='http://dataservice.accuweather.com/currentconditions/v1/332154?apikey=a6yx6CL07vXUENGLUJbAtTX0aryWEvGp&language=en-us&details=true';
  public static getHoursWeatherUrl='http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/332154?apikey=%27.$weather_api.%27&language=en-us&details=true&metric=true';
  public static getForecastDailyWeatherUrl='http://dataservice.accuweather.com/forecasts/v1/daily/5day/332154?apikey=%27.$weather_api.%27&language=en-us&details=true';


  /***constants**/
  public static capablity_user='';
  public static authtoken : any ='';
    public static userID : any ='';
    

  constructor() {
    // console.log('Hello LoginServiceProvider Provider');
  }

}

//get_t_storm_prediction