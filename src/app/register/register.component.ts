import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from '../service/app.service';
import { AppHelper } from '../helper/app.helper';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    form: FormGroup;
    hide: boolean = true;

    constructor(
      private appService : AppService,
      private helper : AppHelper
    ) { }

    ngOnInit() {
      this.initForm();
    }

    initForm(){
      this.form = new FormGroup({
          fullName: new FormControl('',[Validators.required]),
          password: new FormControl('',[Validators.required]),
          email: new FormControl('',[Validators.required, Validators.email]),
          phone: new FormControl('',[Validators.required,]),
      })
    }

    submit(){
      if (!this.form.valid) {
        Object.keys(this.form.controls).forEach(key =>{
            this.form.get(key).markAsTouched();
        })
        this.appService.changeMessage('Pastikan semua field terisi')
      }else{
        let params = {
          "authorityName" : "ROLE_USER",
          "email": this.form.get('email').value,
          "fullName": this.form.get('fullName').value,
          "phoneNumber": this.form.get('phone').value,
          "password": this.form.get('password').value
        }
        this.appService.changeCloak(false);
        this.appService.registerUser(params).subscribe(
          response=>{
            this.appService.changeCloak(true);
            this.appService.changeMessage('Proses Sign Up Berhasil, Silahkan Login')
            this.resetForm()
          },
          error=>{
            this.appService.changeCloak(true);
            this.appService.changeMessage('Input Data Gagal')
            this.helper.openSnackBar();
            console.log(error);
          }
        )
      }
    }

    resetForm(){
      this.form.reset();
    }
}
