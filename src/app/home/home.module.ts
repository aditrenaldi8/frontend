import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { HomeRouteModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { QuestionComponent } from '../question/question.component';
import { DiscComponent } from '../disc/disc.component';
import { ResultComponent } from '../result/result.component';

@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    QuestionComponent,
    DiscComponent,
    ResultComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    HomeRouteModule,
    RouterModule
  ],
  providers: [],
  bootstrap: []
})
export class HomeModule { }
