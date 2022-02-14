import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
  import Chart  from 'chart.js/auto';

@Component({
  selector: 'app-new-charts',
  templateUrl: './new-charts.component.html',
  styleUrls: ['./new-charts.component.scss']
})
export class NewChartsComponent implements AfterViewInit {

  @ViewChild('pieCanvas') private pieCanvas!: ElementRef;

  pieChart: any;

  constructor() { }

    ngAfterViewInit(): void {
      this.pieChartBrowser();
    }

    pieChartBrowser(): void {
      this.pieChart = new Chart(this.pieCanvas.nativeElement, {
        type: 'pie',
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



