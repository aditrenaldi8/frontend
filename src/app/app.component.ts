import { Component } from '@angular/core';
import { AppService } from './service/app.service';
import { AppHelper } from './helper/app.helper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  cloakHidden : boolean = true;

  constructor(
    private appService: AppService,
    private helper : AppHelper,
  ) {}

  ngOnInit() {
    this.appService.cloakHidden.subscribe(value => {
      this.cloakHidden = value;
    });

    this.appService.snackBarMessage.subscribe(value =>{
      setTimeout(()=>{
        this.helper.openSnackBar();
      })
    })
  }
}
