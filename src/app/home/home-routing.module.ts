import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

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

