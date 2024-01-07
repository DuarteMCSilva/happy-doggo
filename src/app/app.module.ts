import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MasterNavComponent } from './components/master-nav/master-nav.component';
import { ContentComponent } from './components/main/content/content.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTreeModule } from '@angular/material/tree';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MasterNavComponent,
    ContentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTreeModule,
    HttpClientModule,
    MatListModule,
    MatTooltipModule,
    MatMenuModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
