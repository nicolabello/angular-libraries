import {AfterViewInit, Directive, ElementRef, OnDestroy} from '@angular/core';
import {MDCSwitch} from '@nicolabello/material-components-web';

@Directive({
  selector: '[mdcSwitch]',
})
export class SwitchDirective implements AfterViewInit, OnDestroy {

  private instance?: MDCSwitch;

  constructor(private elementRef: ElementRef<HTMLButtonElement>) {
  }

  public ngAfterViewInit(): void {
    this.instance = MDCSwitch.attachTo(this.elementRef.nativeElement);
  }

  public ngOnDestroy(): void {
    this.instance?.destroy();
  }

}
