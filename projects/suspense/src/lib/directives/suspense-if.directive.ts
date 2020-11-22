import {Directive, EmbeddedViewRef, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {Subscription} from 'rxjs';
import {SuspenseService} from '../services/suspense.service';

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

    const isVisible = this.isVisible;

    if (isVisible) {

      const value = this.value;

      if (this.embeddedViewRef) {
        this.embeddedViewRef.context.implicit = value;
      } else {
        this.embeddedViewRef = this.viewContainer.createEmbeddedView(this.templateRef, {implicit: value});
      }

    } else if (this.embeddedViewRef) {

      this.viewContainer.clear();
      this.embeddedViewRef = null;

    }

  }

}
