import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list'; 
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio'; 
import {MatTableModule} from '@angular/material/table'; 
import {MatIconModule} from '@angular/material/icon'; 
import {MatSlideToggleModule} from '@angular/material/slide-toggle'; 

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { QuestionComponent } from './question/question.component';
import { StatComponent } from './stat/stat.component';
import { CapitalComponent } from './capital/capital.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    QuestionComponent,
    StatComponent,
    CapitalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    [RouterModule.forRoot([
      { path: '', component: MenuComponent },
      { path: 'question', component: QuestionComponent },
      { path: 'stat', component: StatComponent },
      { path: 'capital', component: CapitalComponent },
      ])
    ],
    HttpClientModule,
    MatButtonModule,
    MatListModule,
    MatCheckboxModule,
    MatRadioModule,
    FormsModule,
    MatTableModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
