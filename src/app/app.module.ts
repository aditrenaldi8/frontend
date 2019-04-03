import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeModule } from './home/home.module';
import { QuestionComponent } from './question/question.component';
import { ResultComponent } from './result/result.component';
import { RegisterComponent } from './register/register.component';
import { MainComponent } from './main/main.component';
import { DiscComponent } from './disc/disc.component';
import { AppService } from './service/app.service';
import { AppHelper } from './helper/app.helper';
import { AuthGuard } from './service/auth.guard';
// import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    // QuestionComponent,
    // ResultComponent,
    RegisterComponent,
    MainComponent,
    // AdminComponent,
    // DiscComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    ReactiveFormsModule,
    HomeModule,
    HttpClientModule,
    RouterModule
  ],
  exports:[
  
  ],
  providers: [
    AppService,
    AuthGuard,
    AppHelper
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
