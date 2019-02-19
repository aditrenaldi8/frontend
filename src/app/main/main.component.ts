import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  selectedValue: any = 'Login';
  toogleOptions : any[] = ['Login', 'Sign Up'];
  watcher: Subscription;

  colLeft: number;
  colRight: number;
  rowLeft : number;
  rowRight: number;
  height : string;
  hide : boolean;
  

  constructor(
    private router: Router,
    media: MediaObserver,
  ) { 
    this.watcher = media.media$.subscribe((change: MediaChange) => {
      if (change.mqAlias === 'sm' || change.mqAlias === 'xs') {
        this.colLeft = 12;
        this.colRight = 12;
        this.rowLeft = 4;
        this.rowRight = 4;
        this.height = '150px';
        this.hide = true;
      } else {
        this.colLeft = 6;
        this.colRight = 4;
        this.rowLeft = 1;
        this.rowRight = 1;
        this.height = '500px';
        this.hide = false;
      }
    });
  }

  

  ngOnInit() {
    const data = localStorage.getItem('wai');
    if(data){
      this.router.navigate(['/home'])
    }
  }

  change(data: any){
      this.selectedValue = data.value;
  }

}
