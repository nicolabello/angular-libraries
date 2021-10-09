import {AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, Output} from '@angular/core';
import {MDCSelect} from '@nicolabello/material-components-web';
import {updateMDCInstance} from '../helpers/mdc';

@Directive({
  selector: '.mdc-select',
  exportAs: 'mdcSelect'
})
export class SelectDirective implements AfterViewInit, OnChanges, OnDestroy {

  public instance?: MDCSelect;

  @Input() public required?: boolean;
  @Input() public disabled?: boolean;
  @Input() public valid?: boolean;
  @Input() public value?: any;

  @Output() private valueChange = new EventEmitter<string>();

  constructor(private elementRef: ElementRef<HTMLElement>) {
  }

  public ngAfterViewInit(): void {
    this.instance = new MDCSelect(this.elementRef.nativeElement);
    this.instance.listen('MDCSelect:change', this.emitInstanceValue);
    this.updateMDCInstance();
  }

  public ngOnDestroy(): void {
    this.instance?.unlisten('MDCSelect:change', this.emitInstanceValue);
    this.instance?.destroy();
  }

  public ngOnChanges(): void {
    this.updateMDCInstance();
  }

  private updateMDCInstance(): void {
    updateMDCInstance(this.instance, {
      required: this.required,
      disabled: this.disabled,
      valid: this.valid,
      value: this.value,
    });
  }

  private emitInstanceValue = () => {
    this.valueChange.emit(this.instance?.value);
  }

}
