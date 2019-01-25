import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { QuestionComponent } from '../question/question.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { RegisterComponent } from '../register/register.component';

const routes : Routes = [
    {
        path: 'home',
        component: HomeComponent,
        children: [
            // start_children
            { 
                path: '',   
                component: DashboardComponent,
            },
            { 
                path: 'question',   
                component: QuestionComponent,
            },
            { 
                path: 'register',   
                component: RegisterComponent,
            },
        ]
  
      }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    declarations: [

    ],
    providers: [

    ]
})

export class HomeRouteModule {}

