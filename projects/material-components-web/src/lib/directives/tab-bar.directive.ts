import {AfterViewInit, Directive, ElementRef, OnDestroy} from '@angular/core';
import {MDCTabBar} from '@nicolabello/material-components-web';

@Directive({
  selector: '[mdcTabBar]',
})
export class TabBarDirective implements AfterViewInit, OnDestroy {

  private instance?: MDCTabBar;

  constructor(private elementRef: ElementRef<HTMLElement>) {
  }

  public ngAfterViewInit(): void {
    this.instance = MDCTabBar.attachTo(this.elementRef.nativeElement);
  }

  public ngOnDestroy(): void {
    this.instance?.destroy();
  }

}
