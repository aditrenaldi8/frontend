import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

    @Input() response: any ;
    
    lineChartLabels:Array<any> = ['D', 'I', 'S', 'C'];
    lineChartOptions:any = {
      responsive: true
    };

    lineChartDataPublic:Array<any> = []
    lineChartDataPrivate:Array<any> = []
    lineChartDataPercieved:Array<any> = []

    color:Array<any>=[
      {
        fillColor: 'red',
        strokeColor: 'red',
        highlightFill: 'red',
        highlightStroke: 'red'
      }
    ];

    color2:Array<any>=[
      {
        fillColor: 'blue',
        strokeColor: 'blue',
        highlightFill: 'blue',
        highlightStroke: 'blue'
      }
    ];

    color3:Array<any>=[
      {
        fillColor: 'yellow',
        strokeColor: 'yellow',
        highlightFill: 'yellow',
        highlightStroke: 'yellow'
      }
    ]

    lineChartLegend:boolean = true;
    lineChartType:string = 'line';

    show:boolean = false;
    type : string;
    description: string;

    constructor() { }

    ngOnInit() {
      setTimeout(()=>{
        this.setData(this.response);
      },200)
    }

    setData(response : any){
        this.lineChartDataPublic.push({
          'data' : [
              response.data.publicSelf.dominant, response.data.publicSelf.influence, response.data.publicSelf.steady, response.data.publicSelf.compliance 
          ],
          label: 'Public'
        })

        this.lineChartDataPrivate.push({
          'data' : [
              response.data.privateSelf.dominant, response.data.privateSelf.influence, response.data.privateSelf.steady, response.data.privateSelf.compliance
          ],
          label: 'Private'
        })

        this.lineChartDataPercieved.push({
          'data' : [
              response.data.perceivedSelf.dominant, response.data.perceivedSelf.influence, response.data.perceivedSelf.steady, response.data.perceivedSelf.compliance 
          ],
          label: 'Percieved'
        })

        this.type = response.data.resultProfiling.profileName;
        this.description = response.data.resultProfiling.profileDescription;

        this.show = true;
    }
}
