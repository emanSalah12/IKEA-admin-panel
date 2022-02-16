import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {

  public darkModeSubject: BehaviorSubject<boolean>;

  constructor() {
    this.darkModeSubject = new BehaviorSubject<boolean>(this.isDark);
  }

  get getdarkModeStatus(): Observable<boolean> {
    return this.darkModeSubject.asObservable();
  }

  get isDark():boolean{
   return localStorage.getItem('darkMode')?true: false ;
  }
}
