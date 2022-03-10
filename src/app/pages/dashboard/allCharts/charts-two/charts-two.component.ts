import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Chart } from 'chart.js';
import { log } from 'console';

@Component({
  selector: 'app-charts-two',
  templateUrl: './charts-two.component.html',
  styleUrls: ['./charts-two.component.scss'],
})
export class ChartsTwoComponent implements AfterViewInit, OnInit {
  totalSubCate: [] | any;
  sub: any;
  pieChart: any;
  name: any;
  dataArr: [] | any = [];
  colors: [] | any = [];

  @ViewChild('barCanvas') private barCanvas!: ElementRef;

  constructor(private firestore: AngularFirestore) {}

  getSubCategories() {
    const subCat = this.firestore
      .collectionGroup('subCategory')
      .valueChanges()
      .subscribe((data) => {
        this.sub = data;
        for (let i = 0; i < data.length; i++) {
          var name = this.sub[i].Name;
          this.dataArr.push(name);
          console.log(name);
          // console.log(this.dataArr);
        }
      });
  }

  pieChartBrowser(): void {
    this.pieChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Headboards','Bedding','Room dividers','Bags','Bath mats','Outdoor flooring',
                 'Kitchen lighting','Tables & desks','Interior fittings','Door mats','Bedroom furniture sets',
                 'Moving supplies'
      ],

        datasets: [
          {
            label: 'subCategories',
            backgroundColor: '#3e95cd',
            data: [133, 221, 783, 2478,400,333,2000,1055,1888,250,480,1000,1200,570,777,1500,1600],
          },
          {
            label: 'Products',
            backgroundColor: '#EA6A47',
            data: [408, 547, 675, 734,555,874,1500,1200,900,950,280,178,777,999,1000,1900,2000],
          },
        ],
      },

    });
  }

  // pieChartBrowser(): void {
  //   this.pieChart = new Chart(this.barCanvas.nativeElement, {
  //     type: 'bar',
  //     data: {
  //       labels:[ this.dataArr],
  //       datasets: [{
  //         label:'# subCategory',
  //         backgroundColor: ['#D32D41'],

  //         data: [12, 19, 28, 24,44,88,77,99,100,25,12,25,64,79,84,24]
  //       }]
  //     }
  //   });
  // }

  ngAfterViewInit(): void {
    this.pieChartBrowser();
  }

  ngOnInit(): void {
    this.getSubCategories();
  }
}
