import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { UploadMapelPage } from '../pages/upload-mapel/upload-mapel';
import { ListMateriPage } from '../pages/list-materi/list-materi';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {IonicStorageModule } from '@ionic/storage';

import { MyStorageProvider } from '../providers/my-storage/my-storage';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { GuruService } from '../guru.service';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    UploadMapelPage,
    ListMateriPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    UploadMapelPage,
    ListMateriPage
  ],
  providers: [
    StatusBar,
    GuruService,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    MyStorageProvider,
  ]
})
export class AppModule {}
