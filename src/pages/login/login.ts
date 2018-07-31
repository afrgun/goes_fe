import { Component } from '@angular/core';
import { NavController, NavParams, Platform, ToastController, LoadingController } from 'ionic-angular';

import { MyStorageProvider } from '../../providers/my-storage/my-storage';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { NgForm } from '@angular/forms';

import { HomePage } from '../home/home';

//@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public HeightBox: number;
  public HeightTop: number;

  loading: any;
  userData = { kd_guru: '', pass_guru: '', status: '0'};
  responseData: any;
  submitted = false;
  token: any;
  statusnya: any;

  public penggal  : any;
  public golongan : any;

  constructor( public platform: Platform, public navCtrl: NavController, public navParams: NavParams,
    public authService: AuthServiceProvider, public loadingCtrl: LoadingController, public toastCtrl: ToastController,
    private myStorage: MyStorageProvider ) {

      this.myStorage.getLocalStorage('token').then(data =>{
        this.token = data;
        if(this.token){
          this.navCtrl.setRoot(HomePage);
        } 
      })

      this.myStorage.getLocalStorage('status').then(data =>{
        this.statusnya = data;
        console.log(this.statusnya);
      })
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    setTimeout(()=>{
      this.HeightBox = this.platform.height() / 3;
      this.HeightTop = this.HeightBox / 1.5;
      console.log(this.HeightBox);
    }, 100);
  }

  doLogin(form: NgForm){
    //this.navCtrl.setRoot(HomePage);
    this.submitted = true;
    let loading = this.loadingCtrl.create({
      content: 'Tunggu sebentar...'
    })
    
    if(form.valid){
      loading.present();

      let input = {
        kd_guru: this.userData.kd_guru,
        pass_guru: this.userData.pass_guru,
        status: this.userData.status
      }
      
      //this.http.post(apiUrl, input, options).subscribe(data => {
      this.authService.userLogin(input).then(result =>{
        console.log(result);
        loading.dismiss();
        
        if(result['status'] === 200){
          
          this.penggal = input.kd_guru.split('');
          this.golongan = this.penggal[0] ? this.penggal[0] : this.golongan;

          if(this.golongan == 2 || this.golongan == 3 || this.golongan == 1){
            this.myStorage.setLocalStorage('userReturn',JSON.stringify(result));  
            this.navCtrl.setRoot(HomePage, {fromLogin: true});

            this.showAlert('Selamat Datang ' + result['nama']);
            this.myStorage.setLocalStorage('token', result['token']);
            console.log('cektokenn',this.myStorage.getLocalStorage('token'))
            console.log('responya',result['status']);
            this.myStorage.setLocalStorage('status', result['status']) 
          } else {
            this.showAlert('Golongan tidak sesuai');
          }

        } else {
          this.showAlert(result['message']);
        }
        //localStorage.setItem('token', this.responseData);
      }, (err) => {
        this.loading.dismiss();
        console.log('errorrr', err);
      })
    } 
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'Tunggu sebentar...'
    });

    this.loading.present();
  }

  showAlert(val){
    let toast = this.toastCtrl.create({
      message: val,
      duration: 3000,
      position:'middle'
    });
    toast.present();
  };

}
