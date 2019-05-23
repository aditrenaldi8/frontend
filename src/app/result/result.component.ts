import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { yAxis } from '../shared/model/y-axis';
import publicJson from '../shared/model/public.json';
import privateJson from '../shared/model/private.json';
import percievedJson from '../shared/model/percieved.json';

import * as _ from 'lodash';
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas';  

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

    @Input() response: any ;
    @Input() hideButton: boolean = false;
    @Input() user: any = null;

    publicValue : yAxis;
    privateValue : yAxis;
    percievedValue : yAxis;

    // lineChartLabels:Array<any> = ['D', 'I', 'S', 'C'];
    // lineChartOptions:any = {
    //   responsive: true,
    //   maintainAspectRatio: false,
    //   elements: {
    //     line: {
    //         tension: 0, // disables bezier curves
    //     }
    //   },
    //   scales: {
    //     yAxes: [
    //       {
    //         ticks: {
    //           min: -40,
    //           max: 40
    //         }
    //       }
    //     ],
    //   }
    // };

    // lineChartDataPublic:Array<any> = []
    // lineChartDataPrivate:Array<any> = []
    // lineChartDataPercieved:Array<any> = []

    // publicChartColors:Array<any> = [
    //   { // blue
    //     backgroundColor: '#B0C4DE',
    //     borderColor: '#27408B',
    //     pointBackgroundColor: '#6495ED',
    //     pointBorderColor: '#4876FF',
    //     pointHoverBackgroundColor: '#fff',
    //     pointHoverBorderColor: '#4876FF'
    //   },
    // ];

    // privateChartColors:Array<any> = [
    //   { // sea green
    //     backgroundColor: '#BDFCC9',
    //     borderColor: '#2E8B57',
    //     pointBackgroundColor: '#54FF9F',
    //     pointBorderColor: '#43CD80',
    //     pointHoverBackgroundColor: '#fff',
    //     pointHoverBorderColor: '#43CD80'
    //   },
    // ];

    // percievedChartColors:Array<any> = [
    //   { // gold
    //     backgroundColor: '#EEDC82',
    //     borderColor: '#8B7500',
    //     pointBackgroundColor: '#CDBE70',
    //     pointBorderColor: '#CDAD00',
    //     pointHoverBackgroundColor: '#fff',
    //     pointHoverBorderColor: '#CDAD00'
    //   },
    // ];

    // lineChartLegend:boolean = true;
    // lineChartType:string = 'line';

    show:boolean = false;
    // type : string;
    description: string;

    watcher: Subscription;
    column : number;

    /** Template reference to the canvas element */
    @ViewChild('canvasPublic') canvasPublic: ElementRef;
    @ViewChild('canvasPrivate') canvasPrivate: ElementRef;
    @ViewChild('canvasPercieved') canvasPercieved: ElementRef;

    /** Canvas 2d context */
    private public: CanvasRenderingContext2D;
    private private: CanvasRenderingContext2D;
    private percieved: CanvasRenderingContext2D;


    constructor(
      media : MediaObserver,
    ) { 
      this.watcher = media.media$.subscribe((change: MediaChange) => {
        if (change.mqAlias === 'sm' || change.mqAlias === 'xs') {
          this.column = 12;
        } else {
          this.column = 4;
        }
      });
    }

    ngOnInit() {
      this.publicValue = publicJson;
      this.privateValue = privateJson;
      this.percievedValue = percievedJson;
      
      this.show = true;
      setTimeout(()=>{  
        // this.setData(this.response);
        this.drawChart();
      },200)
    }

    drawChart(){
      this.public = (this.canvasPublic.nativeElement as HTMLCanvasElement).getContext('2d');
      this.percieved = (this.canvasPercieved.nativeElement as HTMLCanvasElement).getContext('2d');
      this.private = (this.canvasPrivate.nativeElement as HTMLCanvasElement).getContext('2d');
  
      this.draw('public', this.response);
      this.draw('percieved', this.response);
      this.draw('private', this.response);
    }

    // setData(response : any){
    //     this.lineChartDataPublic.push({
    //       'data' : [
    //           response.data.publicSelf.dominant, response.data.publicSelf.influence, response.data.publicSelf.steady, response.data.publicSelf.compliance 
    //       ],
    //       label: 'Public',
    //     })

    //     this.lineChartDataPrivate.push({
    //       'data' : [
    //           response.data.privateSelf.dominant, response.data.privateSelf.influence, response.data.privateSelf.steady, response.data.privateSelf.compliance
    //       ],
    //       label: 'Private'
    //     })

    //     this.lineChartDataPercieved.push({
    //       'data' : [
    //           response.data.perceivedSelf.dominant, response.data.perceivedSelf.influence, response.data.perceivedSelf.steady, response.data.perceivedSelf.compliance 
    //       ],
    //       label: 'Percieved'
    //     })

    //     // this.type = response.data.resultProfiling.profileName;
    //     this.description = response.data.resultProfiling ?  response.data.resultProfiling.profileDescription : response.result.profileDescription;

    //     this.show = true;
    // }

    draw(type : string, response:any){
      this.description = response.data.resultProfiling ?  response.data.resultProfiling.profileDescription : response.result.profileDescription;

      let context : any;
      let title : string = type == 'public' ? 'Public Self' : type=='private' ? 'Private Self' : 'Percieved Self';
      let color : string = type == 'public' ? 'Blue' : type=='private' ? 'Green' : 'Red';
      let number : string = type == 'public' ? '1' : type=='private' ? '2' : '3';
      let detail : string = type == 'public' ? 'MOST' : type=='private' ? 'LEAST' : 'CHANGE';
      let detail2 : string = type == 'public' ? 'Mask' : type=='private' ? 'Core' : 'Mirror';

      let data = response.formData ? response.formData : response.data.formData;
    
      let dominance : any;
      let influence : any;
      let steady : any;
      let compliance : any;

      if(type == 'public'){
        dominance = _.find(this.publicValue.D, item => item.value == data.most.dominant );
        influence = _.find(this.publicValue.I, item => item.value == data.most.influence );
        steady = _.find(this.publicValue.S, item => item.value == data.most.steady);
        compliance = _.find(this.publicValue.C, item => item.value == data.most.compliance );
      }else if(type == 'private'){
        dominance = _.find(this.privateValue.D, item => item.value == data.least.dominant );
        influence = _.find(this.privateValue.I, item => item.value == data.least.influence );
        steady = _.find(this.privateValue.S, item => item.value == data.least.steady );
        compliance = _.find(this.privateValue.C, item => item.value ==data.least.compliance );
      }else{
        dominance = _.find(this.percievedValue.D, item => item.value ==  data.change.dominant );
        influence = _.find(this.percievedValue.I, item => item.value == data.change.influence );
        steady = _.find(this.percievedValue.S, item => item.value == data.change.steady );
        compliance = _.find(this.percievedValue.C, item => item.value == data.change.compliance );
      }

      if(type == 'public'){
        context = this.public;
      }else if(type == 'private'){
        context = this.private;
      }else{
        context = this.percieved;
      }

      context.beginPath();
      context.font = "12px Arial";
      context.lineWidth = 1;
      context.strokeStyle = "orange";

      context.fillText("Graph "+number+", "+detail,60,15);
      context.fillText(detail2+", "+title,55,35);

      if(type == 'public' || type == 'private'){
        const all = 24 - Number((Number(dominance.value) + Number(influence.value) + Number(steady.value) + Number(compliance.value)));
        context.fillText("D = "+ dominance.value,10,60);
        context.fillText("I = "+ influence.value,50,60);
        context.fillText("S = "+ steady.value,90,60);
        context.fillText("C = "+ compliance.value,130,60);
        context.fillText("* = "+ all,170,60);
      }else{
        context.fillText("D = "+ dominance.value,30,60);
        context.fillText("I = "+ influence.value,70,60);
        context.fillText("S = "+ steady.value,110,60);
        context.fillText("C = "+ compliance.value,150,60);
      }
      

      // vertical
      context.fillText("D",30,90);
      context.moveTo(20, 500);
      context.lineTo(20, 100);
      
      context.fillText("I",70,90);
      context.moveTo(60, 500);
      context.lineTo(60, 100);
      
      context.fillText("S",110,90);
      context.moveTo(100, 500);
      context.lineTo(100, 100);
      
      context.fillText("C",150,90);
      context.moveTo(140, 500);
      context.lineTo(140, 100);
      
      context.moveTo(180, 500);
      context.lineTo(180, 100);
      
      //horizontal
      // axis zero
      context.fillText("0",190,310);
      context.moveTo(20, 300);
      context.lineTo(180, 300);
      
      //up
      context.fillText("8",190,110);
      context.moveTo(20, 100);
      context.lineTo(180, 100);   
      
      //botttom
      context.fillText("-8",190,500);
      context.moveTo(20, 500);
      context.lineTo(180, 500);
      
      context.stroke();
      context.closePath();
      
      context.beginPath();  
      context.lineWidth = 1;
      context.strokeStyle = "orange";
      context.setLineDash([5, 3]);
      
      //up   
      context.fillText("6",190,160);
      context.moveTo(20, 150);
      context.lineTo(180, 150);
      
      context.fillText("4",190,210);
      context.moveTo(20, 200);
      context.lineTo(180, 200); 
      
      context.fillText("2",190,260);
      context.moveTo(20, 250);
      context.lineTo(180, 250); 
      
      //bottom
      context.fillText("-2",190,360);
      context.moveTo(20, 350);
      context.lineTo(180, 350);        

      context.fillText("-4",190,410);
      context.moveTo(20, 400);
      context.lineTo(180, 400);
      
      context.fillText("-6",190,455);
      context.moveTo(20, 450);
      context.lineTo(180, 450);        
      
      context.stroke();
      context.closePath();

      //value 
      context.beginPath();
      context.lineWidth = 2;
      context.setLineDash([0, 0]);
      context.strokeStyle = color;
      context.fillStyle = color;
      
      // context.arc(40, dominance.yAxis, 2, 0, 2 * Math.PI);
      context.moveTo(40, dominance.yAxis);
      context.lineTo(80, influence.yAxis);  
      
      // context.arc(80, influence.yAxis, 2, 0, 2 * Math.PI);
      context.moveTo(80, influence.yAxis);
      context.lineTo(120, steady.yAxis); 
      
      // context.arc(120, steady.yAxis, 2, 0, 2 * Math.PI);
      context.moveTo(120, steady.yAxis);
      context.lineTo(160, compliance.yAxis); 
      
      // context.arc(160, compliance.yAxis, 2, 0, 2 * Math.PI);

      context.stroke();
      context.closePath();
  }

  print(){ 
      var data = document.getElementById('contentToConvert');  
      html2canvas(data).then(canvas => {  
        // Few necessary setting options  
        var imgWidth = 208;   
        var pageHeight = 295;    
        var imgHeight = canvas.height * imgWidth / canvas.width;  
        var heightLeft = imgHeight;  
    
        const contentDataURL = canvas.toDataURL('image/png')  
        let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
        var position = 0;  
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
        pdf.save(this.user.name+'.pdf'); // Generated PDF   
      });  
  } 
}
