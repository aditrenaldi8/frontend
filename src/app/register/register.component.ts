import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    form: FormGroup;

    constructor(
    ) { }

    ngOnInit() {
      this.initForm();
    }

    initForm(){
      this.form = new FormGroup({
          name: new FormControl('',[Validators.required]),
          email: new FormControl('',[Validators.required, Validators.email]),
          package: new FormControl('',[Validators.required]),
      })
    }

    submit(){}
}
