import {Directive, OnDestroy, OnInit} from '@angular/core';
import {SuspenseData} from '../types/suspense';
import {SuspenseIfDirective} from './suspense-if.directive';

@Directive({
  selector: '[nblSuspenseIfEmpty]',
})
export class SuspenseIfEmptyDirective extends SuspenseIfDirective<SuspenseData> implements OnInit, OnDestroy {

  public get isVisible(): boolean {
    return (
      !this.suspenseService.loading.booleanValue && !this.suspenseService.error.booleanValue && !this.suspenseService.data.booleanValue
    );
  }

  public get value(): SuspenseData {
    return this.suspenseService.data.value;
  }

}
