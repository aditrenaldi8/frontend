import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  cloakHidden : boolean = true;

  constructor(
    private appService: AppService
  ) {}

  ngOnInit() {
    this.appService.cloakHidden.subscribe(value => {
      this.cloakHidden = value;
    });
    console.log(this.cloakHidden)
  }
}
