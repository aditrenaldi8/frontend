import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.initForm();
  }

  form: FormGroup;
  hide: boolean = true;

  initForm(){
    this.form = new FormGroup({
      username : new FormControl('',[Validators.required]),
      password : new FormControl('',[Validators.required])
    })
  }
}
