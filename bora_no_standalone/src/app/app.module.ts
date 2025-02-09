import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {provideHttpClient} from '@angular/common/http';
import { VistaPalmaresComponent } from './vista-palmares/vista-palmares.component';
import { GlobalCorredorComponent } from './global-corredor/global-corredor.component';
import { AnadirLogroComponent } from './anadir-logro/anadir-logro.component';

@NgModule({
  declarations: [
    AppComponent,
    VistaPalmaresComponent,
    GlobalCorredorComponent,
    AnadirLogroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterOutlet,
    CommonModule,
    FormsModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
