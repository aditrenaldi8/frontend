import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { HomeRouteModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { QuestionComponent } from '../question/question.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HomeComponent,
    QuestionComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    HomeRouteModule,
    RouterModule
  ],
  providers: [],
  bootstrap: []
})
export class HomeModule { }
