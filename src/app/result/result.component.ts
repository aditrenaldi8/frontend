import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { MediaObserver, MediaChange } from '@angular/flex-layout';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

    @Input() response: any ;
    
    lineChartLabels:Array<any> = ['D', 'I', 'S', 'C'];
    lineChartOptions:any = {
      responsive: true,
      maintainAspectRatio: false,
      elements: {
        line: {
            tension: 0, // disables bezier curves
        }
      },
      scales: {
        yAxes: [
          {
            ticks: {
              min: -40,
              max: 40
            }
          }
        ],
      }
    };

    lineChartDataPublic:Array<any> = []
    lineChartDataPrivate:Array<any> = []
    lineChartDataPercieved:Array<any> = []

    publicChartColors:Array<any> = [
      { // blue
        backgroundColor: '#B0C4DE',
        borderColor: '#27408B',
        pointBackgroundColor: '#6495ED',
        pointBorderColor: '#4876FF',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#4876FF'
      },
    ];

    privateChartColors:Array<any> = [
      { // sea green
        backgroundColor: '#BDFCC9',
        borderColor: '#2E8B57',
        pointBackgroundColor: '#54FF9F',
        pointBorderColor: '#43CD80',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#43CD80'
      },
    ];

    percievedChartColors:Array<any> = [
      { // gold
        backgroundColor: '#EEDC82',
        borderColor: '#8B7500',
        pointBackgroundColor: '#CDBE70',
        pointBorderColor: '#CDAD00',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#CDAD00'
      },
    ];

    lineChartLegend:boolean = true;
    lineChartType:string = 'line';

    show:boolean = false;
    // type : string;
    description: string;

    watcher: Subscription;
    column : number;

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
      setTimeout(()=>{
        this.setData(this.response);
      },200)
    }

    setData(response : any){
        this.lineChartDataPublic.push({
          'data' : [
              response.data.publicSelf.dominant, response.data.publicSelf.influence, response.data.publicSelf.steady, response.data.publicSelf.compliance 
          ],
          label: 'Public',
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

        // this.type = response.data.resultProfiling.profileName;
        this.description = response.data.resultProfiling ?  response.data.resultProfiling.profileDescription : response.result.profileDescription;

        this.show = true;
    }
}
