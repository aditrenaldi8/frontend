import { Component, OnInit } from '@angular/core';
import { Result } from '../shared/model/result';
import { AppService } from '../service/app.service';
import { AppHelper } from '../helper/app.helper';
import { Answer } from '../shared/model/answer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-disc',
  templateUrl: './disc.component.html',
  styleUrls: ['./disc.component.css']
})
export class DiscComponent implements OnInit {

  constructor(
    private appService: AppService,
    private helper : AppHelper,
    private router : Router
  ) { }

  questionDone: boolean = false;
  email : string;
  result: Result;
  graph : any;

  // canAnswer : boolean;
  graphVal : any;
  isNew: boolean;

  ngOnInit() {
    this.email = JSON.parse(localStorage.getItem('data')).email;
    this.checkLatest();

    const account = JSON.parse(localStorage.getItem('account'));
    if(account != 'USER'){
      this.router.navigate(['/home/dashboard']);
    }
  }

  checkLatest(){
    const latest = localStorage.getItem('latest') ? JSON.parse(localStorage.getItem('latest')) : null;
    console.log(latest);
    if(latest){
      const canAnswer = this.helper.compareDate(latest.updated_at);
      this.isNew = true;
      if(!canAnswer){
        this.graphVal = JSON.parse(latest.form_data);
        console.log(this.graphVal)
        this.isNew = false;
        this.setGraph();
      }
    }else{
      this.isNew = true;
    }
  }

  setGraph(value? : any){
    this.graph = value ? value : this.graphVal;
    this.questionDone = true;
    // this.canAnswer = true;

    value && this.setlatest();
  }

  setlatest(){
    this.appService.changeCloak(false)
    this.appService.initUser().subscribe(response=>{
      this.appService.changeCloak(true)
      if(localStorage.getItem('latest')){
        localStorage.removeItem('latest')
        this.saveLatest(response);
      }else{
        this.saveLatest(response);
      }
  
    },error=>{
      this.appService.changeCloak(true)
      console.log(error);
    });
  }

  saveLatest(response : any){
    localStorage.setItem('latest', JSON.stringify(response));
    this.appService.changeLatest(response);
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
        this.setGraph(response);
      },
      error=>{
        this.appService.changeCloak(true);
        if(error.status == 401){
          this.appService.changeMessage('Otorisasi tidak Sah, Silahkan Login Ulang');
        }else{
          this.appService.changeMessage('Gagal mendapatkan data')
        }
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
        mostEqual: this.result.private.all + this.result.private.c + this.result.private.d + this.result.private.i + this.result.private.s,
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
      respondenData: this.setResponseData(this.result.summary)
    }

    return data;
  }

  setResponseData(value : Answer[]){
      let data :any[] = [];
      value.map((val,index)=>{
        data.push([index+1,val.most, val.least]);
      })
      return JSON.stringify(data);
  }

}
