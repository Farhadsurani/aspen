export class Alert_page {

  /**validations**/
  public static enter_firstname='Please enter First Name';
  public static enter_lastname='Please enter Last Name';
  public static enter_confirmpassword='Please enter Confirm Password';
  public static passwordmatch='Password does not match with the Confirm Password';
   public static enter_confirmemail='Please enter Confirm Email';
  public static emailmatch='Email does not match with the Confirm Email';
  public static email_validattion='Please enter valid email';
  public static password_validattion='Please enter valid password';

  public static enter_cardnumber='Please enter Card Number';
  public static enter_expMonth='Please enter Expiry Month';
  public static enter_expYear='Please enter Expiry Year ';
  public static enter_cvc='Please enter CVV';
  public static enter_StreetAddress='Please enter Street Address ';
  public static enter_City='Please enter City ';
  public static enter_State='Please enter State ';
  public static enter_Postal='Please enter Postalcode ';
  public static enter_Country='Please enter Country ';

  /***messages**/
  public static disconnect_server='Could not connect to server';
  public static tryagain="Some Thing went wrong in login.Please try again later";
  public static loginsuccess='Logged In successfully';
    public static registersuccess='Registered successfully Please login into your account';

  constructor() {
    console.log('alert page');
  }

}
