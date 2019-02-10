import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private appService : AppService,
    private router : Router,
    private snackBar : MatSnackBar
  ) { }

  ngOnInit() {
    this.initForm();
  }

  form: FormGroup;
  hide: boolean = true;

  initForm(){
    this.form = new FormGroup({
      email : new FormControl('',[Validators.required, Validators.email]),
      password : new FormControl('',[Validators.required])
    })
  }

  login(){
    if (!this.form.valid) {
      Object.keys(this.form.controls).forEach(key =>{
          this.form.get(key).markAsTouched();
      })
      this.appService.changeMessage('All Mandatory Field Must be Filled')
      this.openSnackBar()
    }else{
      let params = {
        "email" : this.form.get('email').value,
        "password" : this.form.get('password').value
      };
      this.appService.changeCloak(false);
      this.appService.login(params).subscribe(
        response=>{
          this.appService.changeCloak(true);
          localStorage.setItem('wai', JSON.stringify(response))
          this.router.navigate(['/home/']);
        },
        error=>{
          this.appService.changeCloak(true);
          this.appService.changeMessage('Wrong Email or Password');
          this.openSnackBar();
          console.log(error);
        }
      )
    }
  }

  openSnackBar() {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 1000,
    });
  }
}
