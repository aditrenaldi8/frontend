import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { QuestionComponent } from './question/question.component';
import { ResultComponent } from './result/result.component';

const routes: Routes = [
  {
      path: '',
      redirectTo: '/login',
      pathMatch: 'full'
  },
  {
      path: 'login',
      component: LoginComponent,
  },
  {
      path: 'question',
      component: QuestionComponent,
  },
  {
      path: 'result',
      component: ResultComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
