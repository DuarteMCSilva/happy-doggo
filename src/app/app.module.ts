import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MasterNavComponent } from './components/master-nav/master-nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTreeModule } from '@angular/material/tree';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/main/home/home.component';
import { RandomComponent } from './components/main/random/random.component';
import { NotFoundComponent } from './components/main/not-found/not-found.component';
import { BreedComponent } from './components/main/breed/breed.component';
import { AllBreedsComponent } from './components/main/all-breeds/all-breeds.component';
import { CapitalizePipe } from './utils/capitalize.pipe';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'random', component: RandomComponent },
  { path: 'breeds/:breed/:sub', component: BreedComponent },
  { path: 'breeds/:breed', component: BreedComponent },
  { path: 'all-breeds', component: AllBreedsComponent },
  { path: '**', component: NotFoundComponent }
]


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MasterNavComponent,
    HomeComponent,
    RandomComponent,
    NotFoundComponent,
    BreedComponent,
    AllBreedsComponent,
    CapitalizePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTreeModule,
    HttpClientModule,
    MatListModule,
    MatTooltipModule,
    MatMenuModule,
    RouterModule.forRoot(routes)
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    HttpClient,
    CapitalizePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
