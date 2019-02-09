import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

    response: any = {
      "email": "robihidayat122@gmail.com",
      "data": {
        "perceivedSelf": {
          "compliance": "27.0",
          "dominant": "22.0",
          "influence": "20.0",
          "steady": "19.0"
        },
        "publicSelf": {
            "compliance": "16.0",
            "dominant": "21.0",
            "influence": "28.0",
            "steady": "11.0"
        },
        "privateSelf": {
            "compliance": "11.0",
            "dominant": "10.0",
            "influence": "28.0",
            "steady": "22.0"
        }
      }
    }
    

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
        this.show = true;
      },200)

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
    }
}
