import {AfterViewInit, Directive, ElementRef, OnDestroy} from '@angular/core';
import {MDCRipple} from '@nicolabello/material-components-web';

@Directive({
  selector: '[mdcRipple]',
})
export class RippleDirective implements AfterViewInit, OnDestroy {

  private instance?: MDCRipple;

  constructor(private elementRef: ElementRef<HTMLElement>) {
  }

  public ngAfterViewInit(): void {
    this.instance = MDCRipple.attachTo(this.elementRef.nativeElement);
  }

  public ngOnDestroy(): void {
    this.instance?.destroy();
  }

}
