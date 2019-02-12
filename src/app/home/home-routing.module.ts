import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AuthGuard } from '../service/auth.guard';
import { DiscComponent } from '../disc/disc.component';

const routes : Routes = [
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard],
        children: [
            // start_children
            // { 
            //     path: '',   
            //     component: DashboardComponent,
            // },
            { 
                path: '',   
                component: DiscComponent,
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

