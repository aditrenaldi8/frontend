import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { MatSnackBar } from '@angular/material';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    form: FormGroup;
    @Output() sentVal = new EventEmitter<any>();

    constructor(
      private appService : AppService,
      private snackBar : MatSnackBar
    ) { }

    ngOnInit() {
      this.initForm();
    }

    initForm(){
      this.form = new FormGroup({
          username: new FormControl('',[Validators.required]),
          email: new FormControl('',[Validators.required, Validators.email]),
          phone: new FormControl('',[Validators.required,]),
      })
    }

    submit(){
      if (!this.form.valid) {
        Object.keys(this.form.controls).forEach(key =>{
            this.form.get(key).markAsTouched();
        })
        this.appService.changeMessage('All Mandatory Field Must be Filled')
        this.openSnackBar()
      }else{
        let params = {
          "email": this.form.get('email').value,
          "userName": this.form.get('username').value,
          "phoneNumber": this.form.get('phone').value,
        }
        this.appService.changeCloak(false);
        this.appService.registerUser(params).subscribe(
          response=>{
            this.appService.changeCloak(true);
            this.sentVal.emit(this.form.get('email').value);
          },
          error=>{
            this.appService.changeCloak(true);
            this.appService.changeMessage('Input Data Gagal')
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
