import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  constructor(
    private _fb : FormBuilder,
  ) { }


  ngOnInit() {
    this.form = new FormGroup({
      name : new FormControl('',[Validators.required]),
      time : new FormControl('',[Validators.required]),
      category : new FormControl('',[Validators.required]),
    })
    this.setFormArray();
  }

  form: FormGroup;

  get formArray(): FormArray {
    return this.form.get('question') as FormArray;
  }

  setFormArray(){
    const question = [];
    for(var i = 0; i < 3;  i++) {
      question.push(this.initQuestion());
    }


    const addr = this._fb.array(question);
    this.form.setControl('question', addr);
    this.form.get('question').updateValueAndValidity();
  }

  initQuestion(){
    return this._fb.group({
      question: ['', Validators.required],
      answer1: ['', Validators.required],
      answer2: ['', Validators.required],
      answer3: ['', Validators.required],
      answer4: ['', Validators.required],
      right: ['', Validators.required],
    });
  }

  submit(){}
}
