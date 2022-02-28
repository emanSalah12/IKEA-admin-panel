import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  OnInit,
} from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-new-charts',
  templateUrl: './new-charts.component.html',
  styleUrls: ['./new-charts.component.scss'],
})

export class NewChartsComponent implements AfterViewInit, OnInit {
  totalSubCate: [] | any;
  sub: any;
  pieChart: any;
  name:any
 dataArr: [] |any =[] ;

  @ViewChild('pieCanvas') private pieCanvas!: ElementRef;

  constructor(private firestore: AngularFirestore) {}

  getSubCategories() {

    const subCat = this.firestore
      .collectionGroup('subCategory').valueChanges()
      .subscribe((data) => {
        this.sub = data;
        for (let i = 0; i < data.length; i++) {
          var name = this.sub[i].Name;
          var pieDatta = this.dataArr.push(name)
          // console.log(name);
          // console.log(pieDatta);
        }

      }
      )}


  pieChartBrowser() {
    this.pieChart = new Chart(this.pieCanvas.nativeElement, {
      type: 'pie',
      data: {
        labels: [ this.dataArr],
        datasets: [
          {
            backgroundColor: ['#1C4E80', '#EA6A47', '#D32D41', '#6AB187',
            // '#FF0000','#00FF00','#0000FF','#808080','	#FFFF00','#008000'


          ],
            data: [12, 19, 28, 24],
          },
        ],
      },
    })
  }

  ngOnInit() {
    this.getSubCategories();
  }

  ngAfterViewInit(): void {
    this.pieChartBrowser();
  }
}
