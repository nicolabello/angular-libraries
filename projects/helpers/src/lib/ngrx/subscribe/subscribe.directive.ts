import {ChangeDetectorRef, Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {Observable, Subscription} from 'rxjs';

class Context<T> {
  nblSubscribe?: T;
}

@Directive({
  selector: '[nblSubscribe]'
})
export class SubscribeDirective<T> implements OnInit, OnDestroy {

  private observable?: Observable<any>;
  private context: Context<T> = new Context();
  private subscription?: Subscription;

  constructor(
    private viewContainer: ViewContainerRef,
    private cdr: ChangeDetectorRef,
    private templateRef: TemplateRef<Context<T>>
  ) {
  }

  @Input()
  set nblSubscribe(observable: Observable<T>) {
    if (observable !== this.observable) {
      this.observable = observable;
      this.subscription?.unsubscribe();
      this.subscription = this.observable.subscribe(value => {
        this.context.nblSubscribe = value;
        this.cdr.markForCheck();
      });
    }
  }

  public static ngTemplateContextGuard<T>(dir: SubscribeDirective<T>, ctx: unknown): ctx is Context<T> {
    return true;
  }

  public ngOnInit(): void {
    this.viewContainer.createEmbeddedView(this.templateRef, this.context);
  }

  public ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
