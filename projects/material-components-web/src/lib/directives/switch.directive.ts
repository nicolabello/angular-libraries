import {AfterViewInit, Directive, ElementRef, OnDestroy} from '@angular/core';
import {MDCSwitch} from '@nicolabello/material-components-web';

@Directive({
  selector: '.mdc-switch',
  exportAs: 'mdcSwitch'
})
export class SwitchDirective implements AfterViewInit, OnDestroy {

  public instance?: MDCSwitch;

  constructor(private elementRef: ElementRef<HTMLButtonElement>) {
  }

  public ngAfterViewInit(): void {
    this.instance = new MDCSwitch(this.elementRef.nativeElement);
  }

  public ngOnDestroy(): void {
    this.instance?.destroy();
  }

}
