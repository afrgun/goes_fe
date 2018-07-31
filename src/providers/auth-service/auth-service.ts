import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthServiceProvider {

  public url: string;

  constructor(public http: Http) {
    console.log('Hello AuthServiceProvider Provider');

    this.url = environment.apiUrl;
  }

  userLogin(input: any) {

    let headers = new Headers({
      'Authorization': '',
      "Content-Type": "application/json"
    });

    let options = new RequestOptions({ headers: headers });

    console.log(input);

    return new Promise(resolve => {      
      this.http.post(this.url + 'login', input, options)
      .map(res => res.json())
      .subscribe(data => {                 
        resolve(data);
      }, err => {
        //
        resolve(err);
      });
    });    
  }

  userLogout(input: any, token){
    let headers = new Headers({
      'User-ID': input,
      "Content-Type": "application/json"
    });

    let options = new RequestOptions({ headers: headers });

      return new Promise(resolve => {      
        this.http.post(this.url + 'logout', input, options)
        .map(res => res.json())
        .subscribe(data => {                 
          resolve(data);
        }, err => {
          //
          resolve(err);
        });
      }); 
  }
  

}
