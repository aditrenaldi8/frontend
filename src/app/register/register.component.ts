import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from '../app.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    form: FormGroup;
    @Output() sentVal = new EventEmitter<any>();

    constructor(
      private appService : AppService
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
      let params = {
        "email": this.form.get('email').value,
        "username": this.form.get('username').value,
        "phoneNumber": this.form.get('phone').value,
      }
      this.appService.changeCloak(false);
      this.appService.registerUser(params).subscribe(
        response=>{
          this.appService.changeCloak(true);
          console.log(response);
          this.sentVal.emit(this.form.get('email').value);
        },
        error=>{
          this.appService.changeCloak(true);
          console.log(error);
        }
      )
    }
}
