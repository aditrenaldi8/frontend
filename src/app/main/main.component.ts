import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  selectedValue: any = 'Login';
  toogleOptions : any[] = ['Login', 'Sign Up'];

  constructor(
    private router: Router
  ) { }

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
