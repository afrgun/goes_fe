import { Component } from '@angular/core';
import { NavController, ActionSheetController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { MyStorageProvider } from '../../providers/my-storage/my-storage';

import { GuruService } from '../../guru.service';
import { ListMateriPage } from '../list-materi/list-materi';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  userDetails : any;
  responseData : any;
  isLoggedIn: boolean = false;

  public guru: any;
  public apiUrl: string;
  private fromLogin: boolean = false;

  public nip : any;
  public nama : any;
  public stat : any;


  constructor(public navCtrl: NavController, public authService:AuthServiceProvider,
    public actionSheetCtrl: ActionSheetController, public guruService: GuruService, public navParams: NavParams,
    private myStorage: MyStorageProvider) {
    
      if (this.navParams.get('fromLogin')) {
       this.fromLogin = true;
      }
    
    if(localStorage.getItem("token")) {
      this.isLoggedIn = true;
      console.log("berhasil")
    }
    
    //this.userPostData.kd_guru = this.userDetails.kd_guru;
    //this.userPostData.pass_guru = this.userDetails.pass_guru;
  }

  ionViewDidLoad() {
    console.log("masuk home");
    this.collectData();
  }

  collectData(){
    this.myStorage.getLocalStorage('userReturn').then(data => {
      let profiles = JSON.parse(data);
      console.log("abc", profiles);
      this.nama = profiles['nama'];
      this.nip = profiles['kode'];
      this.stat = profiles['stat'];
    })
  }

  getGuru(){
      this.guruService.getGuru().subscribe((data)=>{
        let result = data;
        this.guru = result['result'];
        console.log("aa", this.guru);
      })
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Materi',
          role: 'materi',
          cssClass: 'catCustom',
          handler: () => {
            console.log('Materi clicked');
            this.navCtrl.push(ListMateriPage);
          }
        },
        {
          text: 'Tugas',
          cssClass: 'catCustom',
          handler: () => {
            console.log('Materi clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
 
    actionSheet.present();
  }

}
