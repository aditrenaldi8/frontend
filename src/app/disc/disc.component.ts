import { Component, OnInit } from '@angular/core';
import { Result } from '../shared/model/result';
import { AppService } from '../service/app.service';
import { AppHelper } from '../helper/app.helper';

@Component({
  selector: 'app-disc',
  templateUrl: './disc.component.html',
  styleUrls: ['./disc.component.css']
})
export class DiscComponent implements OnInit {

  constructor(
    private appService: AppService,
    private helper : AppHelper
  ) { }

  questionDone: boolean = false;
  email : string;
  result: Result;
  graph : any;

  ngOnInit() {
    this.email = JSON.parse(localStorage.getItem('data')).sub;
  }

  getAnswer(value:Result){
    this.result = value;
    this.getResult();
  }

  getResult(){
    let params = this.buildPayload()
    
    this.appService.changeCloak(false);
    this.appService.getGraph(params).subscribe(
      response=>{
        this.appService.changeCloak(true);
        this.graph = response;
        this.questionDone = true;
      },
      error=>{
        this.appService.changeCloak(true);
        this.appService.changeMessage('Gagal mendapatkan data')
        this.helper.openSnackBar();
        console.log(error);
      }
    )
  }

  buildPayload(){
    const data = {
      change: {
        compliance: this.result.percieved.c,
        dominant:  this.result.percieved.d,
        influence:  this.result.percieved.i,
        steady:  this.result.percieved.s
      },
      doingTask: new Date(),
      email: this.email,
      least: {
        all:  this.result.private.all,
        compliance: this.result.private.c,
        dominant: this.result.private.d,
        influence: this.result.private.i,
        mostEqual: this.result.public.all + this.result.private.c + this.result.private.d + this.result.private.i + this.result.private.s,
        steady: this.result.private.s
      },
      most: {
        all: this.result.public.all,
        compliance: this.result.public.c,
        dominant: this.result.public.d,
        influence: this.result.public.i,
        mostEqual: this.result.public.all + this.result.public.c + this.result.public.d + this.result.public.i + this.result.public.s, 
        steady: this.result.public.s
      },
      respondenData: JSON.stringify(this.result.summary)
    }

    return data;
  }

}
