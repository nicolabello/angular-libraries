import {AfterViewInit, Directive, ElementRef, HostListener, OnDestroy} from '@angular/core';
import {MDCSwitch} from '@nicolabello/material-components-web';
import {ToggleDirective} from '../helpers/toggle.directive';

@Directive({
  selector: '.mdc-switch',
  exportAs: 'mdcSwitch'
})
export class SwitchDirective extends ToggleDirective<MDCSwitch> implements AfterViewInit, OnDestroy {

  public instance?: MDCSwitch;

  public ngAfterViewInit(): void {
    this.instance = new MDCSwitch(this.elementRef.nativeElement);
    this.updateMDCInstance();
  }

  constructor(private elementRef: ElementRef<HTMLButtonElement>) {
    super();
  }

  @HostListener('click', ['$event'])
  private onHostClick(event: MouseEvent): void {
    event.stopImmediatePropagation();
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
    this.instance?.destroy();
  }

}
