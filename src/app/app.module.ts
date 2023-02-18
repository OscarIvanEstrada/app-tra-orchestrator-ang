import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';

import { HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InfoBoxComponent } from './info-box/info-box.component';
import { HomeComponent } from './home/home.component';
import { FlowChartComponent } from './flow-chart/flow-chart.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatStepperModule} from '@angular/material/stepper';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule, 
    ReactiveFormsModule,
    FormsModule,
    MatStepperModule,
    MatCardModule,
    MatProgressSpinnerModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      
      { path: 'orchestrator/:process', component: FlowChartComponent },
      
    ]),
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    HomeComponent,
    InfoBoxComponent,
    FlowChartComponent,
    InfoBoxComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/