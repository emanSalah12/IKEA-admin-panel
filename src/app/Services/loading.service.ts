import { BehaviorSubject, map, Observable } from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  public loadingSubject: BehaviorSubject<boolean>;

  constructor() {
    this.loadingSubject = new BehaviorSubject<boolean>(false);
  }

  get getLoadingStatus(): Observable<boolean> {
    return this.loadingSubject.asObservable();
  }
}
