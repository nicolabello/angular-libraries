import {ChangeDetectorRef, Directive, Input, Optional} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormGroupDirective,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';

/* In your child component add:
providers: [
  { provide: NG_VALUE_ACCESSOR, useExisting: MyComponent, multi: true },
  { provide: NG_VALIDATORS, useExisting: MyComponent, multi: true }
]
*/

const emptyFunction = () => {
};

@Directive()
// tslint:disable-next-line: directive-class-suffix
export class CommonValueAccessor<T> implements ControlValueAccessor, Validator {

  // tslint:disable-next-line: no-input-rename
  @Input('formControl') private _formControl: FormControl | undefined;
  @Input() private formControlName: string | undefined;

  private _disabled: boolean | undefined;

  public get disabled(): boolean {
    return !!this._disabled;
  }

  private _value: T | undefined;

  public set value(value: T | undefined) {
    if (value !== this._value) {
      this._value = value;
      this.onChange(value);
      this.onTouch();
      this.onValidatorChange();
    }
  }

  public get value(): T | undefined {
    return this._value;
  }

  protected validators: ValidatorFn[] = [];

  protected onChange: (value: T | undefined) => void = emptyFunction;
  protected onTouch: () => void = emptyFunction;
  protected onValidatorChange: () => void = emptyFunction;

  constructor(protected cdr: ChangeDetectorRef, @Optional() private formGroupDirective: FormGroupDirective) {
  }

  protected formatValueInput(value: any): T {
    return value;
  }

  protected formatValueOutput(value: T | undefined): any {
    return value;
  }

  // ControlValueAccessor implementation - START

  // Input for value
  public writeValue(value: any): void {
    this._value = this.formatValueInput(value);
    this.cdr.markForCheck();
  }

  public registerOnChange(onChange: (value: any) => void): void {
    // Output for value
    this.onChange = (value: T | undefined) => onChange(this.formatValueOutput(value));
  }

  public registerOnTouched(onTouched: () => void): void {
    // Output for touched
    this.onTouch = onTouched;
  }

  // Input for disabled
  public setDisabledState(disabled: boolean): void {
    this._disabled = disabled;
  }

  // ControlValueAccessor implementation - END

  // Validators implementation - START

  public validate(control: FormControl): ValidationErrors | null {

    let errors = {};

    this.validators.forEach(validator => {
      const result = validator(control);
      errors = result ? {...errors, ...result} : errors;
    });

    return Object.keys(errors).length ? errors : null;

  }

  public registerOnValidatorChange(onValidatorChange: () => void): void {
    this.onValidatorChange = onValidatorChange;
  }

  // Validators implementation - END

  public get formControl(): AbstractControl | null {

    // If instantiated with [formGroup] > formControlName
    if (this.formGroupDirective && this.formControlName) {
      return this.formGroupDirective.control.get(this.formControlName);
    }

    // If instantiated with [formControl]
    if (this._formControl) {
      return this._formControl;
    }

    // If instantiated with [(ngModel)]
    return new FormControl(this.value, this.validators);

  }

  public get invalid(): boolean {
    return this.formControl?.invalid || false;
  }

  public get errors(): ValidationErrors | null {
    return this.formControl?.errors || null;
  }

}
