import {Directive, OnDestroy, OnInit} from '@angular/core';
import {SuspenseLoading} from '../types/suspense';
import {SuspenseIfDirective} from './suspense-if.directive';

@Directive({
  selector: '[nblSuspenseIfLoading]',
})
export class SuspenseIfLoadingDirective extends SuspenseIfDirective<SuspenseLoading> implements OnInit, OnDestroy {

  public get isVisible(): boolean {
    return this.suspenseService.loading.booleanValue;
  }

  public get value(): SuspenseLoading {
    return this.suspenseService.loading.value;
  }

}
