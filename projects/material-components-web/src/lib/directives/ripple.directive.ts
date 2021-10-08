import {AfterViewInit, Directive, ElementRef, OnDestroy} from '@angular/core';
import {MDCRipple} from '@nicolabello/material-components-web';

@Directive({
  selector: '[mdcRipple], .mdc-card__primary-action, .mdc-fab, .mdc-list-item',
  exportAs: 'mdcRipple'
})
export class RippleDirective implements AfterViewInit, OnDestroy {

  public instance?: MDCRipple;

  constructor(private elementRef: ElementRef<HTMLElement>) {
  }

  public ngAfterViewInit(): void {
    this.instance = new MDCRipple(this.elementRef.nativeElement);
  }

  public ngOnDestroy(): void {
    this.instance?.destroy();
  }

}
