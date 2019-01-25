import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    timeLeft: number = 100;
    time : string;
    interval: any;

    form: FormGroup;
    questions: any[]=[];

    constructor(
      private _fb: FormBuilder
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
        this.setQuestion()
    }

    setQuestion(){
        this.questions = [
          {
            'question': '2*8 ?',
            'answer':[
              {'answer':'128'},
              {'answer':'32'},
              {'answer':'16'},
              {'answer':'256'},
            ]
          },
          {
            'question': '4*3 ?',
            'answer':[
              {'answer':'12'},
              {'answer':'32'},
              {'answer':'64'},
              {'answer':'256'},
            ]
          },
          {
            'question': '2*9 ?',
            'answer':[
                {'answer':'512'},
                {'answer':'32'},
                {'answer':'18'},
                {'answer':'256'},
            ]
          },
        ];

        this.setFormArray();
    }

    get formArray(): FormArray {
      return this.form.get('question') as FormArray;
    }

    initQuestion(value : any){
      return this._fb.group({
        question: [value.question, Validators.required],
        answer:['', Validators.required]
      });
    }

    setFormArray(){
      if(this.questions){
        const question = this.questions.map(value => 
          this.initQuestion(value)
      );
  
        const addr = this._fb.array(question);
        this.form.setControl('question', addr);
        this.form.get('question').updateValueAndValidity();
      }
      console.log('form', this.form)
    }

    start(){
      this.startTimer();
    }
}
