import {AfterViewInit, Directive, ElementRef, OnDestroy} from '@angular/core';
import {MDCList} from '@nicolabello/material-components-web';

@Directive({
  selector: '.mdc-list',
  exportAs: 'mdcList'
})
export class ListDirective implements AfterViewInit, OnDestroy {

  public instance?: MDCList;

  constructor(private elementRef: ElementRef<HTMLElement>) {
  }

  public ngAfterViewInit(): void {
    this.instance = new MDCList(this.elementRef.nativeElement);
  }

  public ngOnDestroy(): void {
    this.instance?.destroy();
  }

}
