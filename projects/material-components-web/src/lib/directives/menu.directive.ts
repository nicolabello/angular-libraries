import {AfterViewInit, Directive, ElementRef, Input, OnDestroy} from '@angular/core';
import {MDCMenu} from '@nicolabello/material-components-web';

@Directive({
  selector: '[mdcMenu]'
})
export class MenuDirective implements AfterViewInit, OnDestroy {

  @Input() private anchorElement?: HTMLElement;

  private instance?: MDCMenu;

  constructor(private elementRef: ElementRef<HTMLElement>) {
  }

  public ngAfterViewInit(): void {
    this.instance = MDCMenu.attachTo(this.elementRef.nativeElement);
    if (this.anchorElement) {
      this.instance.setAnchorElement(this.anchorElement);
    }
    this.instance.setAnchorMargin({top: 10, left: 10, right: 10, bottom: 10});
  }

  public ngOnDestroy(): void {
    this.instance?.destroy();
  }

  public toggle(open?: boolean) {
    if (this.instance) {
      this.instance.open = open === true || open === false ? open : !this.instance.open;
    }
  }

}
