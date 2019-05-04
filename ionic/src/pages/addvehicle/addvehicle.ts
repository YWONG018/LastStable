import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AppProvider } from '../../providers/app/app';
import { TranslateService } from '@ngx-translate/core';
import { TabsPage } from '../tabs/tabs';
import { FleetsPage } from '../fleets/fleets';
 
/**
 * Generated class for the AddvehiclePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-addvehicle',
  templateUrl: 'addvehicle.html',
})
export class AddvehiclePage {

  public language: string;
  public title: string;
  public vehicle_type: string;
  public manufacturer: string;
  public vehicle_details: string;
  public model_no: string;
  public serial_no: string;
  public purchase_date: string;
  public description: string;
  public add: string;
  public addmsgtitle: string;
  public addmsg: string;

  public SelVeh = '';
  public VehTypeTb: boolean = false;
  public OthrVehType: any;
  public SelManu = '';
  public ManuTB: boolean = false;
  public OthrManu: any;
  public ModelNo: any;
  public SerialNo: any;
  public PurchaseDate: Date;
  public Description: any;
  public UsrEmail: any;

  buttonOpt: boolean;
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private alertCtrl: AlertController,
    public appprov:AppProvider,
    public _translate: TranslateService) {
      this.getEmail();
      this._initializeTranslation();
  }

  ionViewDidEnter() {
    this._initializeTranslation();     
  }


  public changeLanguage(): void{
    this._translateLanguage();
  }
   
  private _translateLanguage() : void{
    this._translate.use(this.language);
    this._initializeTranslation();
  }
    
  private _initializeTranslation(): void{
      this.title =  this._translate.instant("addvehicle.title");
      this.vehicle_type =  this._translate.instant("addvehicle.vehicle_type");
      this.manufacturer =  this._translate.instant("addvehicle.manufacturer");
      this.vehicle_details =  this._translate.instant("addvehicle.vehicle_details");
      this.model_no =  this._translate.instant("addvehicle.model_no");
      this.serial_no =  this._translate.instant("addvehicle.serial_no");
      this.purchase_date =  this._translate.instant("addvehicle.purchase_date");
      this.description = this._translate.instant("addvehicle.description");
      this.add =  this._translate.instant("addvehicle.add");
      this.addmsgtitle = this._translate.instant("addvehicle.addmsgtitle");
      this.addmsg = this._translate.instant("addvehicle.addmsg");
  }

  /*Add vehicle page content */
  AddVehicle(){

    if(this.SerialNo != '' && 
    this.ModelNo != '' && 
    this.PurchaseDate && 
    this.SelManu != '' && 
    this.Description != '' && 
    this.SelVeh != ''){
      let datestr = this.PurchaseDate.toString();
      this.appprov.addVeh(this.UsrEmail,
                          this.SerialNo,
                          this.ModelNo,
                          datestr,
                          this.SelManu,
                          this.Description,
                          this.SelVeh).then((res) => {
                            // this.appprov.presentAlert('Success!','Vehicle Successfully Added');
                            this.SerialNo = '';
                            this.ModelNo = '';
                            this.PurchaseDate;
                            this.Description = '';
                            this.promptUser();
                          },err=>{
                            console.log(err);
                          })
    }
    else{
      this.appprov.presentAlert('Error!', 'Please fill up the form!');
    }
  }

  /*if vehicle type is none of the given*/
  showOthrVType(){
    if(this.SelVeh == 'Others'){
      this.VehTypeTb = true;
    }
    else{
      this.VehTypeTb = false;
    }
  }
  /*if veh manufacturer type is none of the given*/
  showOthrManu(){
    if(this.SelManu == 'Others'){
      this.ManuTB = true;
    }
    else{
      this.ManuTB = false;
    }
  }

  getEmail(){
    this.appprov.getemail().then((res) => {
      this.UsrEmail = res;
      console.log('YAY' + this.UsrEmail);
    }, err =>{
      console.log(err);
    });
  }

  promptUser() {
    let alert = this.alertCtrl.create({
      title: 'Success!',
      message: 'Vehicle Successfully Added. Do you want to continue adding vehicle?',
      buttons: [
      {
        text: 'No',
        role: 'no',
        handler: () => {
          this.buttonOpt = true;
          this.popBack();
          // console.log('Cancel clicked');
        }
      },
      {
        text: 'Yes',
        role: 'yes',
        handler: () => {
          this.buttonOpt = false;
          this.popBack();
          // console.log('Buy clicked');
        }
      }
    ]
  });
  alert.present();
  }

  popBack(){
    if(this.buttonOpt == true) {
      this.navCtrl.setRoot(FleetsPage);
    }
    else {
      return;
    }
  }

}
