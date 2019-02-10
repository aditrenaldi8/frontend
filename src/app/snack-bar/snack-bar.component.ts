import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.css']
})
export class SnackBarComponent implements OnInit {

  message : string;

  constructor(
    private appService : AppService
  ) { }

  ngOnInit() {
    this.appService.snackBarMessage.subscribe(value => {
      this.message = value;
    });
  }

}
