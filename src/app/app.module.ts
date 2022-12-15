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

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { QuestionComponent } from './question/question.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { StatComponent } from './stat/stat.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    QuestionComponent,
    TopBarComponent,
    StatComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    [RouterModule.forRoot([
      { path: '', component: MenuComponent },
      { path: 'question', component: QuestionComponent },
      { path: 'stat', component: StatComponent },
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
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
