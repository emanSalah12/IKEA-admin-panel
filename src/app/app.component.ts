import { Component, OnInit } from '@angular/core';
import { LoadingService } from './Services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  loading: boolean = false;

  constructor(private loadingServ: LoadingService) {}

  ngOnInit(): void {
    this.loadingServ.getLoadingStatus.subscribe((status) => {
      this.loading = status;
    });
  }
}
