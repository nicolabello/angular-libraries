import {Directive, EmbeddedViewRef, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {Subscription} from 'rxjs';
import {SuspenseService} from '../services/suspense.service';
import {SuspenseIfContext} from '../types/suspense';

@Directive()
export abstract class SuspenseIfDirective<T> implements OnInit, OnDestroy {

  private subscriptions = new Subscription();
  private embeddedViewRef: EmbeddedViewRef<any> | null = null;

  constructor(
    protected templateRef: TemplateRef<any>,
    protected viewContainer: ViewContainerRef,
    protected suspenseService: SuspenseService,
  ) {
  }

  public abstract get isVisible(): boolean;

  public abstract get value(): T;

  public ngOnInit(): void {
    this.subscriptions.add(this.suspenseService.changes.subscribe(() => this.updateView()));
    this.updateView();
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private updateView(): void {

    if (this.isVisible) {

      const context = new SuspenseIfContext(this.value);

      if (this.embeddedViewRef) {
        this.embeddedViewRef.context = context;
      } else {
        this.embeddedViewRef = this.viewContainer.createEmbeddedView(this.templateRef, context);
      }

    } else if (this.embeddedViewRef) {

      this.viewContainer.clear();
      this.embeddedViewRef = null;

    }

  }

}
