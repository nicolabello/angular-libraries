import {AfterViewInit, Directive, ElementRef, Input, OnChanges, OnDestroy} from '@angular/core';
import {MDCTextField} from '@nicolabello/material-components-web';
import {AbstractControl} from '@angular/forms';
import {merge} from 'rxjs';
import {SubscriptionsBucket} from '@nicolabello/ng-helpers';
import {updateMDCInstance} from '../helpers/mdc';

@Directive({
  selector: '[mdcTextField]',
})
export class TextFieldDirective implements AfterViewInit, OnChanges, OnDestroy {

  private instance?: MDCTextField;
  private subscriptions = new SubscriptionsBucket();

  @Input('mdcTextField') private formControl?: AbstractControl;
  @Input() private required?: boolean;
  @Input() private disabled?: boolean;
  @Input() private valid?: boolean;
  @Input() private value: any;

  constructor(private elementRef: ElementRef<HTMLElement>) {
  }

  public ngAfterViewInit(): void {
    this.instance = MDCTextField.attachTo(this.elementRef.nativeElement);
    this.instance.useNativeValidation = false;
    this.instance.required = !!this.required;
    this.instance.disabled = !!this.disabled;
    if (this.formControl) {
      this.subscriptions.push(merge(this.formControl.valueChanges, this.formControl.statusChanges).subscribe(() => this.updateValueAndValidity()));
    }
    this.updateValueAndValidity();
  }

  public ngOnChanges(): void {
    this.updateValueAndValidity();
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribeAll();
    this.instance?.destroy();
  }

  private updateValueAndValidity() {
    updateMDCInstance(this.instance, this.formControl ? {
      // required: this.required,
      // disabled: this.formControl.disabled,
      valid: !(this.formControl.invalid && (this.formControl.dirty || this.formControl.touched)),
      value: this.formControl.value,
    } : {
      // required: this.required,
      // disabled: this.disabled,
      valid: this.valid,
      value: this.value,
    });
  }

}
