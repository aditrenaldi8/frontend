import { Component, OnInit } from '@angular/core';
import { AppHelper } from '../helper/app.helper';
import { AppService } from '../service/app.service';
import { MediaObserver, MediaChange } from '../../../node_modules/@angular/flex-layout';
import { Subscription } from '../../../node_modules/rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  graphVal : any;
  canAnswer : boolean;
  hide : boolean = false;
  class: string = 'responsive60';

  watcher : Subscription;
  constructor(
    private helper : AppHelper,
    private appService : AppService,
    private router : Router,
    media : MediaObserver
  ) { 
    this.watcher = media.media$.subscribe((change: MediaChange) => {
      if (change.mqAlias === 'xs') {
        this.hide = true;
      } else if (change.mqAlias === 'sm'){
        this.class = 'responsive80'
        this.hide = false;
      }else{
        this.class = 'responsive50';
        this.hide = false;
      }
    });
  }

  ngOnInit() {
    this.appService.latest.subscribe(value => {
      this.checkLatest();
    });
    
    const account = JSON.parse(localStorage.getItem('account'));
    if(account != 'USER'){
      this.router.navigate(['/home/dashboard']);
    }
  }

  checkLatest(){
    this.graphVal = localStorage.getItem('latest') ? JSON.parse(localStorage.getItem('latest')) : null;
    if(this.graphVal){
      const latest = this.helper.compareDate(this.graphVal.updated_at);
      if(!latest && this.graphVal.form_data){
        this.canAnswer = false;
      }else{
        this.canAnswer = true;
      }
    }else{
      this.canAnswer = true;
    }
  }

}
