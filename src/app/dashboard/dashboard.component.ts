import { Component, OnInit } from '@angular/core';
import { AppHelper } from '../helper/app.helper';
import { AppService } from '../service/app.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  graphVal : any;
  canAnswer : boolean;
  constructor(
    private helper : AppHelper,
    private appService : AppService
  ) { 

  }

  ngOnInit() {
    this.appService.latest.subscribe(value => {
      this.checkLatest();
    });
  }

  checkLatest(){
    this.graphVal = localStorage.getItem('latest') ? JSON.parse(localStorage.getItem('latest')) : null;
    if(this.graphVal){
      this.canAnswer = this.helper.compareDate(this.graphVal.updateDate)
    }else{
      this.canAnswer = true;
    }
  }

}
