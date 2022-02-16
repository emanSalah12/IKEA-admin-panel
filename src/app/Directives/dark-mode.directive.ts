import { Directive, ElementRef, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[DarkMode]'
})
export class DarkModeDirective implements OnChanges {

  @Input('DarkMode') dm:boolean=false;

  constructor(private elemRef: ElementRef) {
    // this.elemRef.nativeElement.style.color=sessionStorage.getItem('darkMode')=='true'?'white':'black';
   }

  ngOnChanges(): void {
    this.elemRef.nativeElement.style.color=this.dm?'white':'black';
  }
}
