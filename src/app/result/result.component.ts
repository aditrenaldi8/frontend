import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  public doughnutChartLabels = ['Salah', 'Benar',];
  public doughnutChartData = [1, 2];
  public doughnutChartType = 'doughnut';

  constructor() { }

  ngOnInit() {
  }
}
