import { Component, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

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

  constructor(
      media: MediaObserver,
      private router : Router
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

    const data = localStorage.getItem('wai');
    if(!data){
        this.router.navigate(['/login']);
    }
  }

  ngOnInit() {

  }

  logout(){
    localStorage.removeItem('wai');
    this.router.navigate(['/']);
  }

}