import {AfterViewInit, Directive, ElementRef, Input, OnChanges, OnDestroy} from '@angular/core';
import {MDCTextField} from '@nicolabello/material-components-web';
import {SubscriptionsBucket} from '@nicolabello/ng-helpers';
import {updateMDCInstance} from '../helpers/mdc';

@Directive({
  selector: '.mdc-text-field',
  exportAs: 'mdcTextField'
})
export class TextFieldDirective implements AfterViewInit, OnChanges, OnDestroy {

  public instance?: MDCTextField;
  private subscriptions = new SubscriptionsBucket();

  @Input() private required?: boolean;
  @Input() private disabled?: boolean;
  @Input() private valid?: boolean;
  @Input() private value?: any;

  constructor(private elementRef: ElementRef<HTMLElement>) {
  }

  public ngAfterViewInit(): void {
    this.instance = new MDCTextField(this.elementRef.nativeElement);
    this.instance.useNativeValidation = false;
    this.updateMDCInstance();
  }

  public ngOnChanges(): void {
    this.updateMDCInstance();
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribeAll();
    this.instance?.destroy();
  }

  private updateMDCInstance(): void {
    updateMDCInstance(this.instance, {
      required: this.required,
      disabled: this.disabled,
      valid: this.valid,
      value: this.value,
    });
  }

}
