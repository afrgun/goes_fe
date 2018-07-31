import {tap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

import { HttpClient, HttpHeaders, HttpHeaderResponse } from '@angular/common/http';
import { environment } from './environments/environment';


@Injectable()
export class GuruService{
    public url: string;
    GuruList: any;

    constructor(private http:HttpClient){
        this.url = environment.apiUrl;
    }

    getGuru(){
        const url = `${this.url}guru`;
        let headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.get(url, {headers: headers}).pipe(
            tap(res => {
                console.log(res);
                this.GuruList = res['results'];
            })
        )
    }

}