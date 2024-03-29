import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatAutocompleteModule} from '@angular/material/autocomplete'; 
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider'; 

import {
  MapsModule, LegendService, MarkerService, MapsTooltipService, DataLabelService, BubbleService,
  NavigationLineService, SelectionService, AnnotationsService, ZoomService, MapsComponent
} from '@syncfusion/ej2-angular-maps';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { QuestionComponent } from './question/question.component';
import { StatComponent } from './stat/stat.component';
import { CapitalComponent } from './capital/capital.component';
import { MapComponent } from './map/map.component';
import { FlagComponent } from './flag/flag.component';
import { FindComponent } from './find/find.component';
import { FranceComponent } from './france/france.component';
import { UsStateComponent } from './us-state/us-state.component';



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    QuestionComponent,
    StatComponent,
    CapitalComponent,
    MapComponent,
    FlagComponent,
    FindComponent,
    FranceComponent,
    UsStateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    [RouterModule.forRoot([
      { path: '', component: MenuComponent },
      { path: 'question', component: QuestionComponent },
      { path: 'stat', component: StatComponent },
      { path: 'capital', component: CapitalComponent },
      { path: 'map', component: MapComponent },
      { path: 'flag', component: FlagComponent },
      { path: 'find', component: FindComponent },
      { path: 'france', component: FranceComponent },
      { path: 'us-state', component: UsStateComponent },
      
    ])
    ],
    HttpClientModule,
    MatButtonModule,
    MatListModule,
    MatCheckboxModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MapsModule,
  ],
  exports: [RouterModule],
  providers: [LegendService, MarkerService, MapsTooltipService, DataLabelService, BubbleService,
    NavigationLineService, SelectionService, AnnotationsService, ZoomService, MapsComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
