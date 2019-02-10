import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { QuestionComponent } from './question/question.component';
import { ResultComponent } from './result/result.component';
import { RegisterComponent } from './register/register.component';
import { MainComponent } from './main/main.component';
import { DiscComponent } from './disc/disc.component';

const routes: Routes = [
  {
      path: '',
      redirectTo: '/main',
      pathMatch: 'full'
  },
  {
      path: 'main',
      component: MainComponent,
  },
  {
      path: 'login',
      component: LoginComponent,
  },
  {
      path: 'disc',
      component: DiscComponent,
  },
  // {
  //     path: 'question',
  //     component: QuestionComponent,
  // },
  // {
  //     path: 'result',
  //     component: ResultComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
