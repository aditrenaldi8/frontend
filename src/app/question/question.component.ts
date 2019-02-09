import { Component, OnInit } from '@angular/core';
import QuestionJson from '../shared/model/questions.json';

import * as _ from 'lodash';
import { Question } from '../shared/model/question';
import { Result } from '../shared/model/result';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  timeLeft: number = 100;
  time : string;
  interval: any;

  questions: Question[] = [];
  result : Result = new Result();

  section: any[] = [];

  processDone: boolean = false;

  constructor(
  
  ) { }


  ngOnInit() {
    this.setQuestion();
    console.log(this.result)
  }

  setQuestion(){
    const data = QuestionJson;
    data.map(value => {
        this.questions.push(new Question(value.statements));
        this.section.push({'show':false});
    })
    this.section[0].show = true;
    console.log('section', this.section)
  }

  next(index:number){
      this.section[index].show = false;
      this.section[index+1].show = true; 
  }

  previous(index:number){
    this.section[index].show = false;
    this.section[index-1].show = true; 
  }

  startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
        this.convertTime(this.timeLeft)
      }else{

      }
    },1000)
  }
  
  convertTime(value : number){
      var d = Number(value);
      var h = Math.floor(d / 3600);
      var m = Math.floor(d % 3600 / 60);
      var s = Math.floor(d % 3600 % 60);

      var hDisplay = h > 0 ? (String(h).length == 2 ? String(h)+":" : "0"+String(h)+":") : "00:";
      var mDisplay = m > 0 ? (String(m).length == 2 ? String(m)+":" : "0"+String(m)+":") : "00:";
      var sDisplay = s > 0 ? (String(s).length == 2 ? String(s) : "0"+String(s)) : "00";
      this.time = hDisplay + mDisplay + sDisplay; 
  }

  submit(){
      this.questions.map((value, index)=>{
          this.processingData(value, index);
          if(index == this.questions.length -1){
            this.processDone = true;
          }
      })
      this.countDISC();
      console.log('questions', this.questions)
      console.log('result', this.result)
  }

  processingData(value: Question, index: number){
      const likes = _.find(value.statements, item => item.like == true );
      const dislikes = _.find(value.statements, item => item.dislike == true );
      this.questions[index].like = likes ? likes.likeValue : '';
      this.questions[index].dislike = dislikes ? dislikes.dislikeValue : '';
  }

  countDISC(){
    this.result.reset();
    this.questions.map((value)=>{
        this.result.setValue(value.like, 'public');
        this.result.setValue(value.dislike, 'private');
    })
  }

  start(){
    this.startTimer();
  }

  likes(index: number, subIndex: number ){
    const data = this.questions[index].statements[subIndex];
    data.dislike = data.dislike ? !data.dislike : false;
    const othertrueVal = _.find(this.questions[index].statements, value => (value.like == true && value.value != data.value));
   
    if(othertrueVal){
      othertrueVal.like = !othertrueVal.like;
    }
  }

  dislikes(index: number, subIndex: number ){
    const data = this.questions[index].statements[subIndex];
    data.like = data.like ? !data.like : false;
    const othertrueVal = _.find(this.questions[index].statements, value => (value.dislike == true && value.value != data.value));
    
    if(othertrueVal){
      othertrueVal.dislike = !othertrueVal.dislike;
    }
  }

}
