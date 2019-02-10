import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

    @Input() response: any;
    
    lineChartLabels:Array<any> = ['Dominant', 'Influence', 'Steady', 'Compliance'];
    lineChartOptions:any = {
      responsive: true
    };

    lineChartData:Array<any> = []
    lineChartLegend:boolean = true;
    lineChartType:string = 'line';

    show:boolean = false;

    constructor() { }

    ngOnInit() {
      setTimeout(()=>{
        this.setData(this.response);
      },200)

      console.log(this.response)

    }

    setData(response : any){
        this.lineChartData.push({
          'data' : [
              response.data.publicSelf.dominant, response.data.publicSelf.influence, response.data.publicSelf.steady, response.data.publicSelf.compliance 
          ],
          label: 'Public'
        })

        this.lineChartData.push({
          'data' : [
              response.data.privateSelf.dominant, response.data.privateSelf.influence, response.data.privateSelf.steady, response.data.privateSelf.compliance
          ],
          label: 'Private'
        })

        this.lineChartData.push({
          'data' : [
              response.data.perceivedSelf.dominant, response.data.perceivedSelf.influence, response.data.perceivedSelf.steady, response.data.perceivedSelf.compliance 
          ],
          label: 'Percieved'
        })

        this.show = true;
    }
}
