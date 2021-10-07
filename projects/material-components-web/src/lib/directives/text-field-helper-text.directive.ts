import {AfterViewInit, Directive, ElementRef, OnDestroy} from '@angular/core';
import {MDCTextFieldHelperText} from '@nicolabello/material-components-web';

@Directive({
  selector: '[mdcTextFieldHelperText]',
})
export class TextFieldHelperTextDirective implements AfterViewInit, OnDestroy {

  private instance?: MDCTextFieldHelperText;

  constructor(private elementRef: ElementRef<HTMLElement>) {
  }

  public ngAfterViewInit(): void {
    this.instance = MDCTextFieldHelperText.attachTo(this.elementRef.nativeElement);
  }

  public ngOnDestroy(): void {
    this.instance?.destroy();
  }

}
