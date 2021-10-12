import {Directive, Input, OnChanges, OnDestroy} from '@angular/core';
import {AbstractControl, FormControl} from '@angular/forms';
import {merge, Subscription} from 'rxjs';
import {distinctUntilChanged, tap} from 'rxjs/operators';
import {MDCToggleComponent} from '../types/mdc-toggle-component';
import {updateMDCToggleInstance} from './update-mdc-toggle-instance';

@Directive()
export abstract class ToggleDirective<T extends MDCToggleComponent> implements OnChanges, OnDestroy {

  @Input() public disabled?: boolean;
  @Input() public selected?: any;

  private formControl: FormControl | null = null;

  public instance?: T;

  @Input()
  public set mdcFormControl(formControl: AbstractControl | null) {
    if (formControl && formControl instanceof FormControl) {
      if (this.formControl !== formControl) {
        this.formControl = formControl;
        this.formControlSubscription?.unsubscribe();
        this.formControlSubscription = merge(
          formControl.valueChanges.pipe(distinctUntilChanged()),
          formControl.statusChanges.pipe(distinctUntilChanged())
        ).pipe(
          tap(() => this.updateMDCInstance())
        ).subscribe();
      }
    } else {
      this.formControlSubscription?.unsubscribe();
      this.formControl = null;
    }
    this.updateMDCInstance();
  }

  private formControlSubscription?: Subscription;

  public updateMDCInstance(): void {
    if (this.formControl) {
      updateMDCToggleInstance(this.instance, {
        disabled: this.formControl.disabled,
        selected: this.formControl.value,
      });
    } else {
      updateMDCToggleInstance(this.instance, {
        selected: this.selected,
        disabled: !!this.disabled,
      });
    }
  }

  public ngOnChanges(): void {
    this.updateMDCInstance();
  }

  public ngOnDestroy(): void {
    this.formControlSubscription?.unsubscribe();
  }

}
