import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list'; 
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio'; 

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { QuestionComponent } from './question/question.component';
import { TopBarComponent } from './top-bar/top-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    QuestionComponent,
    TopBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    [RouterModule.forRoot([
      { path: '', component: MenuComponent },
      { path: 'question', component: QuestionComponent },
      ])
    ],
    HttpClientModule,
    MatButtonModule,
    MatListModule,
    MatCheckboxModule,
    MatRadioModule,
    FormsModule,
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
