import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import QuestionJson from '../shared/model/questions.json';
import { Question } from '../shared/model/question';
import { Result } from '../shared/model/result';
import { AppService } from '../service/app.service';

import * as _ from 'lodash';
import * as $ from 'jquery';
import { Subscription } from 'rxjs';
import { MediaObserver, MediaChange } from '@angular/flex-layout';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  @Output() sentVal = new EventEmitter<any>();

  timeStart: number = 0;
  time : string;
  interval: any;

  questions: Question[] = [];
  result : Result = new Result();
  section: any[] = [];
  processDone: boolean = false;
  selectedValue: any = 1;
  toogleOptions : any[] = [];

  watcher : Subscription;
  column :number;
  statementColumn :number;
  hide:boolean;

  constructor(
    private appService : AppService,
    media : MediaObserver
  ) { 
    this.watcher = media.media$.subscribe((change: MediaChange) => {
      if (change.mqAlias === 'sm' || change.mqAlias === 'xs') {
        this.statementColumn = 7;
        this.column = 12;
        this.hide = true;
      } else {
        this.statementColumn = 4;
        this.column = 2;
        this.hide = false;
      }
    });
  }


  ngOnInit() {
    this.setQuestion();
  }

  init(){
    this.questions.map((val,index)=>{
      this.initShowHide(index);
    })
  }

  initShowHide(index:number){
    let data = $("#question"+index); 
    if(index == 0){
      data.show()
    }else{
      data.hide()
    }
  }


  showHide(index :number, index2:number){
    this.hideQ(index);
    this.showQ(index2);
  }

  hideQ(index:number):void{
      let data = $("#question"+index); 
      data.hide()
  }

  showQ(index:number):void{
      let data = $("#question"+index); 
      data.show('slow')
  }

  setQuestion(){
    const data = QuestionJson;
    data.map((value,index) => {
        this.questions.push(new Question(value.statements));
        this.section.push({'show':false});
        this.toogleOptions.push(index+1);
    })
    this.section[0].show = true;
  }

  change(value : any){
      this.selectedValue = value;
      const data = _.find(this.section, item => item.show == true );
      const index = _.findIndex(this.section, item => item.show == true );
      if(data) { data.show = false };
      this.section[this.selectedValue - 1].show = true;
      this.showHide(index, this.selectedValue-1)
  }

  next(index:number){
      this.section[index].show = false;
      this.section[index+1].show = true; 
      this.selectedValue += 1;
      this.showHide(index, index+1);
  }

  previous(index:number){
    this.section[index].show = false;
    this.section[index-1].show = true; 
    this.selectedValue -= 1;
    this.showHide(index, index-1);
  }

  startTimer() {
    this.interval = setInterval(() => {
      this.timeStart ++;
      this.convertTime(this.timeStart)
    },1000)

    setTimeout(() => {
      this.init()
    }, 1000);
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
    if(this.isValid()){
      this.questions.map((value, index)=>{
          this.processingData(value, index);
          if(index == this.questions.length -1){
            this.processDone = true;
          }
      })
      this.countDISC();
    }
  }

  isValid(){
      const data = _.find(this.questions, item => item.valid == false );
      if(data){
        this.appService.changeMessage('Pastikan Semua soal terisi');
        return false;
      }else{
        return true;
      }
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
        this.result.setSummary(value);
    })

    if(this.result.valid){
      this.sentVal.emit(this.result)
    }
  }

  start(){
    this.startTimer();
  }

  likes(index: number, subIndex: number ){
    const data = this.questions[index].statements[subIndex];
    data.like = !data.like;
    data.dislike = data.dislike ? !data.dislike : false;
    const othertrueVal = _.find(this.questions[index].statements, value => (value.like == true && value.value != data.value));
   
    if(othertrueVal){
      othertrueVal.like = !othertrueVal.like;
    }
  
    this.valid(index);
  }

  dislikes(index: number, subIndex: number ){
    const data = this.questions[index].statements[subIndex];
    data.dislike = !data.dislike;
    data.like = data.like ? !data.like : false;
    const othertrueVal = _.find(this.questions[index].statements, value => (value.dislike == true && value.value != data.value));
    
    if(othertrueVal){
      othertrueVal.dislike = !othertrueVal.dislike;
    }
   
    this.valid(index);
  }

  valid(index : number){
    setTimeout(()=>{
      const data = this.questions[index];
      const like = _.find(data.statements, value => value.like == true );
      const dislike = _.find(data.statements, value => value.dislike == true );
      
      if(like && dislike){
        this.questions[index].valid = true;
        if(this.questions.length != (index+1)){
          // setTimeout(()=>{
              this.next(index)
          // },1000)
        }
      }
    },100)
  }

}
