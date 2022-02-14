import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-charts-two',
  templateUrl: './charts-two.component.html',
  styleUrls: ['./charts-two.component.scss']
})
export class ChartsTwoComponent implements AfterViewInit {

  @ViewChild('barCanvas') private barCanvas!: ElementRef;

  pieChart: any;

  constructor() { }

  ngAfterViewInit(): void {
    this.pieChartBrowser();
  }

  pieChartBrowser(): void {
    this.pieChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['USERS', 'PRODUCTS', 'SALES', 'ORDERS'],
        datasets: [{
          backgroundColor: [
            '#1C4E80',
            '#EA6A47',
            '#D32D41',
            '#6AB187',

          ],
          data: [12, 19, 28, 24]
        }]
      }
    });
  }


}
