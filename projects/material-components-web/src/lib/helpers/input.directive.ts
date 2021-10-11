import {Directive, Input, OnChanges, OnDestroy} from '@angular/core';
import {updateMDCInputInstance} from './update-mdc-input-instance';
import {MDCInputComponent} from '../types/mdc-input-component';
import {AbstractControl, FormControl} from '@angular/forms';
import {merge, Subscription} from 'rxjs';
import {tap} from 'rxjs/operators';

@Directive()
export abstract class InputDirective<T extends MDCInputComponent> implements OnChanges, OnDestroy {

  @Input() public required?: boolean;
  @Input() public disabled?: boolean;
  @Input() public invalid?: boolean;
  @Input() public value?: any;

  @Input()
  public set mdcFormControl(formControl: AbstractControl | null) {
    if (formControl && formControl instanceof FormControl) {
      this.formControlSubscription?.unsubscribe();
      merge(formControl.valueChanges, formControl.statusChanges).pipe(
        tap(() => {
          updateMDCInputInstance(this.instance, {
            required: !!this.required,
            disabled: formControl.disabled,
            valid: !(formControl.invalid && (formControl.dirty || formControl.touched)),
            value: formControl.value,
          });
        })
      ).subscribe();
    }
  }

  public instance?: T;

  private formControlSubscription?: Subscription;

  public updateMDCInstance(): void {
    updateMDCInputInstance(this.instance, {
      required: !!this.required,
      disabled: !!this.disabled,
      valid: !this.invalid,
      value: this.value,
    });
  }

  public ngOnChanges(): void {
    this.updateMDCInstance();
  }

  public ngOnDestroy(): void {
    this.formControlSubscription?.unsubscribe();
  }

}
