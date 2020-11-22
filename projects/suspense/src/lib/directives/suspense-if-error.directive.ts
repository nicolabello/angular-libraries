import {Directive, OnDestroy, OnInit} from '@angular/core';
import {SuspenseError} from '../models/suspense-types';
import {SuspenseIfDirective} from './suspense-if.directive';

@Directive({
  selector: '[nblSuspenseIfError]',
})
export class SuspenseIfErrorDirective extends SuspenseIfDirective<SuspenseError> implements OnInit, OnDestroy {

  public get isVisible(): boolean {
    return !this.suspenseService.loading.booleanValue && this.suspenseService.error.booleanValue;
  }

  public get value(): SuspenseError {
    return this.suspenseService.error.value;
  }

}
