import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { MyStorageProvider } from '../providers/my-storage/my-storage';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  public token: string;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
    public authService: AuthServiceProvider, public myStorage: MyStorageProvider, public loadingCtrl: LoadingController,
    public toastCtrl: ToastController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage }
    ];

  }

  logout(){
    let loading = this.loadingCtrl.create({
      content: 'Tunggu Sebentar ...'
    });

    this.myStorage.getLocalStorage('userReturn').then(data3 =>{
      let profiles = JSON.parse(data3);

      console.log("mau logout", profiles.kode);

      //let contentHeader = new Headers({"Content-Type": "application/x-www-form-urlencoded"});
      let input = {
        iduser: profiles.kode,
      };

      this.authService.userLogout(input, this.token).then(result => {
        loading.dismiss();
        console.log(result);

        if(result['status'] == 200){
          loading.present();

          this.myStorage.removeStorage('token');
          this.myStorage.removeStorage('status');
          this.myStorage.clearStorage();

          this.nav.setRoot(LoginPage);
          loading.dismiss();
          this.showAlert('Logout berhasil');
          
        }
      })
    })
  }

  showAlert(val){
    let toast = this.toastCtrl.create({
      message: val,
      duration: 3000
    });
    toast.present();
  };

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  homePage(){
    this.nav.setRoot(HomePage);
  }

  aboutPage(){
    this.nav.setRoot(ListPage);
  }
}
