import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
//import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
//import { NativeStorage } from '@ionic-native/native-storage';
import { Storage } from '@ionic/storage';

/*
  Generated class for the MyStorageProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class MyStorageProvider {

  constructor(private storage: Storage, private platform: Platform) {
    console.log('Hello MyStorageProvider Provider');
  }

  setLocalStorage(key:string, val:string): Promise<any> {
    if (this.platform.is('cordova')) {
      return this.storage.set(key, val);
    } else {
      return new Promise((resolve, reject) => {
        localStorage.setItem(key, val);
        resolve(key);
        //alert('Stored ' + key);
      });
    }            
  }

  getLocalStorage(key:string): Promise<string> {
    if (this.platform.is('cordova')) {
      return this.storage.get(key)
      .then((data) => { 
        return data; 
      });
    } else {
      return new Promise((resolve, reject) => {
        resolve(localStorage.getItem(key));
      });      
    }    
  }

  clearStorage() {
    if (this.platform.is('cordova')) {
      this.storage.clear();
    } else {
      return new Promise((resolve, reject) => {
        localStorage.clear();
        resolve(true);
      });
    }

  }

  removeStorage(key:string) {
    if (this.platform.is('cordova')) {
      this.storage.remove(key);
    } else {
      return new Promise((resolve, reject) => {
        localStorage.removeItem(key);
        resolve(true);
      });
    }
  }

}
