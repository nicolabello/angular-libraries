import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {SuspenseData, SuspenseError, SuspenseInput, SuspenseLoading} from '../models/suspense-types';
import {SuspenseService} from '../services/suspense.service';

@Component({
  selector: 'lib-suspense',
  template: `
    <ng-content></ng-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SuspenseService],
})
export class SuspenseComponent implements OnInit, OnDestroy {

  private changesSubscription: Subscription | null = null;

  @Input()
  public set data(value: SuspenseInput<SuspenseData>) {
    this.suspenseService.data.init(value);
  }

  @Input()
  public set loading(value: SuspenseInput<SuspenseLoading>) {
    this.suspenseService.loading.init(value);
  }

  @Input()
  public set error(value: SuspenseInput<SuspenseError>) {
    this.suspenseService.error.init(value);
  }

  constructor(private cdr: ChangeDetectorRef, private suspenseService: SuspenseService) {
  }

  public ngOnInit(): void {
    // TODO: is the markForCheck necessary?
    this.changesSubscription = this.suspenseService.changes.subscribe(() => this.cdr.markForCheck());
  }

  public ngOnDestroy(): void {
    this.changesSubscription?.unsubscribe();
  }

}
