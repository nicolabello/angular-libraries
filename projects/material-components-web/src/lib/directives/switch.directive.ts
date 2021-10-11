import {AfterViewInit, Directive, ElementRef, OnDestroy} from '@angular/core';
import {MDCSwitch} from '@nicolabello/material-components-web';
import {ToggleDirective} from '../helpers/toggle.directive';

@Directive({
  selector: '.mdc-switch',
  exportAs: 'mdcSwitch'
})
export class SwitchDirective extends ToggleDirective<MDCSwitch> implements AfterViewInit, OnDestroy {

  public instance?: MDCSwitch;

  constructor(private elementRef: ElementRef<HTMLButtonElement>) {
    super();
  }

  public ngAfterViewInit(): void {
    this.instance = new MDCSwitch(this.elementRef.nativeElement);
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
    this.instance?.destroy();
  }

}
