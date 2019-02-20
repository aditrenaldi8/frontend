import { Component, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AppService } from '../service/app.service';

import * as _ from 'lodash';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  opened = true;
  over = 'side';
  expandHeight = '42px';
  collapseHeight = '42px';
  displayMode = 'flat';
  // overlap = false;

  watcher: Subscription;
  user : string;

  constructor(
      media: MediaObserver,
      private router : Router,
      private appService : AppService
  ) {
    this.watcher = media.media$.subscribe((change: MediaChange) => {
      if (change.mqAlias === 'sm' || change.mqAlias === 'xs') {
        this.opened = false;
        this.over = 'over';
      } else {
        this.opened = true;
        this.over = 'side';
      }
    });
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('data')).sub;

    const latest = localStorage.getItem('latest');
    if(!latest){
        this.appService.changeCloak(false)
        this.appService.initUser().subscribe(response=>{
          this.appService.changeCloak(true)
          if(!_.isEmpty(response.data)){
            localStorage.setItem('latest', JSON.stringify(response));
          }
        },error=>{
          this.appService.changeCloak(true)
          console.log(error);
        });
    }

  }

  logout(){
    localStorage.removeItem('wai');
    localStorage.removeItem('data');
    localStorage.removeItem('latest');
    this.router.navigate(['/']);
  }

}