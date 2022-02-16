import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DarkModeService } from './Services/dark-mode.service';
import { LoadingService } from './Services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  loading: boolean = false;
  @HostBinding('class') className = '';
  toggleControl = new FormControl(false);

  constructor(
    private loadingServ: LoadingService,
    private overlay: OverlayContainer,
    private darkmodeSer:DarkModeService
    ) {}

  ngOnInit(): void {
    const darkClassName = 'darkMode';
    this.darkmodeSer.darkModeSubject.subscribe(darkMode=>{
      this.className = darkMode ? darkClassName : '';
      if (darkMode) {
        this.overlay.getContainerElement().classList.add(darkClassName);
      } else {
        this.overlay.getContainerElement().classList.remove(darkClassName);
      }

    })
    this.loadingServ.getLoadingStatus.subscribe((status) => {
      this.loading = status;
    });
  }
}
