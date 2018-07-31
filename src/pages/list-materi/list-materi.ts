import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


//@IonicPage()
@Component({
  selector: 'page-list-materi',
  templateUrl: 'list-materi.html',
})
export class ListMateriPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListMateriPage');
  }

}
