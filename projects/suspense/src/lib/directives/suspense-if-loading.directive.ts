import { Directive, OnDestroy, OnInit } from '@angular/core';
import {SuspenseLoading} from '../models/suspense-types';
import {SuspenseIfDirective} from './suspense-if.directive';

@Directive({
  selector: '[libSuspenseIfLoading]'
})
export class SuspenseIfLoadingDirective extends SuspenseIfDirective<SuspenseLoading> implements OnInit, OnDestroy {
  public get isVisible(): boolean {
    return this.suspenseService.loading.booleanValue;
  }

  public get value(): SuspenseLoading {
    return this.suspenseService.loading.value;
  }
}
