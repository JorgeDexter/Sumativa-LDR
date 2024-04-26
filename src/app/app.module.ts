import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { environment } from '../environments/environment'; // Importa el entorno

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    provideDatabase(() => getDatabase()),
    provideFirebaseApp(() => initializeApp({"projectId":"sumativa-ldr","appId":"1:928506101435:web:9386d3018732af25b9739e","databaseURL":"https://sumativa-ldr-default-rtdb.firebaseio.com","storageBucket":"sumativa-ldr.appspot.com","apiKey":"AIzaSyCuugPKbjCafrO_tw5Kp0GC_3CfZHBx7Ww","authDomain":"sumativa-ldr.firebaseapp.com","messagingSenderId":"928506101435"}))],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
