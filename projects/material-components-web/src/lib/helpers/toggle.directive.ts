import {Directive, Input, OnChanges, OnDestroy} from '@angular/core';
import {AbstractControl, FormControl} from '@angular/forms';
import {merge, Subscription} from 'rxjs';
import {tap} from 'rxjs/operators';
import {MDCToggleComponent} from '../types/mdc-toggle-component';
import {updateMDCToggleInstance} from './update-mdc-toggle-instance';

@Directive()
export abstract class ToggleDirective<T extends MDCToggleComponent> implements OnChanges, OnDestroy {

  @Input() public disabled?: boolean;
  @Input() public selected?: any;
  public instance?: T;
  private formControlSubscription?: Subscription;

  @Input()
  public set mdcFormControl(formControl: AbstractControl | null) {
    if (formControl && formControl instanceof FormControl) {
      this.formControlSubscription?.unsubscribe();
      merge(formControl.valueChanges, formControl.statusChanges).pipe(
        tap(() => {
          updateMDCToggleInstance(this.instance, {
            disabled: formControl.disabled,
            selected: formControl.value,
          });
        })
      ).subscribe();
    }
  }

  public updateMDCInstance(): void {
    updateMDCToggleInstance(this.instance, {
      selected: this.selected,
      disabled: !!this.disabled,
    });
  }

  public ngOnChanges(): void {
    this.updateMDCInstance();
  }

  public ngOnDestroy(): void {
    this.formControlSubscription?.unsubscribe();
  }

}
