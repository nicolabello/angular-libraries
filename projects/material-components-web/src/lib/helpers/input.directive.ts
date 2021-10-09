import {Directive, Input, OnDestroy} from '@angular/core';
import {updateMDCInstance} from './mdc';
import {MDCInputComponent} from '../types/mdc';
import {AbstractControl, FormControl} from '@angular/forms';
import {merge, Subscription} from 'rxjs';
import {tap} from 'rxjs/operators';

@Directive()
export abstract class InputDirective<T extends MDCInputComponent> implements OnDestroy {

  public instance?: T;
  @Input() public required?: boolean;
  @Input() public disabled?: boolean;
  @Input() public invalid?: boolean;
  @Input() public value?: any;
  private formControlSubscription?: Subscription;

  @Input()
  public set mdcFormControl(formControl: AbstractControl | null) {
    if (formControl && formControl instanceof FormControl) {
      this.formControlSubscription?.unsubscribe();
      merge(formControl.valueChanges, formControl.statusChanges).pipe(
        tap(() => {
          updateMDCInstance(this.instance, {
            required: !!this.required,
            disabled: formControl.disabled,
            valid: !(formControl.invalid && (formControl.dirty || formControl.touched)),
            value: formControl.value,
          });
        })
      ).subscribe();
    }
  }

  public updateMDCInstance(): void {
    updateMDCInstance(this.instance, {
      required: !!this.required,
      disabled: !!this.disabled,
      valid: !this.invalid,
      value: this.value,
    });
  }

  public ngOnDestroy(): void {
    this.formControlSubscription?.unsubscribe();
  }

}
