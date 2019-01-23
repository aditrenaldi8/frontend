import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { QuestionComponent } from '../question/question.component';

const routes : Routes = [
    {
        path: 'home',
        component: HomeComponent,
        children: [
            // start_children
            { 
              path: 'question',   
              component: QuestionComponent,
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

