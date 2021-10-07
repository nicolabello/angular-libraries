import {AfterViewInit, Directive, ElementRef, OnDestroy} from '@angular/core';
import {MDCList} from '@nicolabello/material-components-web';

@Directive({
  selector: '[mdcList]',
})
export class ListDirective implements AfterViewInit, OnDestroy {

  private instance?: MDCList;

  constructor(private elementRef: ElementRef<HTMLElement>) {
  }

  public ngAfterViewInit(): void {
    this.instance = MDCList.attachTo(this.elementRef.nativeElement);
  }

  public ngOnDestroy(): void {
    this.instance?.destroy();
  }

}
