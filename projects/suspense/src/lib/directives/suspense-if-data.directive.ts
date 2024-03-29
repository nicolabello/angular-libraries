import {Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {SuspenseIfContext, SuspenseInput} from '../types/suspense';
import {SuspenseIfDirective} from './suspense-if.directive';
import {SuspenseService} from '../services/suspense.service';

@Directive({
  selector: '[nblSuspenseIfData]',
})
export class SuspenseIfDataDirective<T> extends SuspenseIfDirective<T> implements OnInit, OnDestroy {

  @Input() public nblSuspenseIfDataOfType?: SuspenseInput<T>;

  constructor(
    templateRef: TemplateRef<SuspenseIfContext<T>>,
    viewContainer: ViewContainerRef,
    suspenseService: SuspenseService
  ) {
    super(templateRef, viewContainer, suspenseService);
  }

  public get isVisible(): boolean {
    return (
      !this.suspenseService.loading.booleanValue &&
      !this.suspenseService.error.booleanValue &&
      this.suspenseService.data.booleanValue
    );
  }

  public get value(): T {
    return this.suspenseService.data.value;
  }

  public static ngTemplateContextGuard<T>(dir: SuspenseIfDataDirective<T>, ctx: unknown): ctx is SuspenseIfContext<T> {
    return true;
  }

}
