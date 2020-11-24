import {AfterViewInit, Directive, ElementRef, Input, NgZone, OnDestroy} from '@angular/core';
import {fromMutationObserver} from 'misc';
import {debounceTime} from 'rxjs/operators';
import {FlexContainerService} from '../../services/flex-container.service';
import {FlexPaneService} from '../../services/flex-pane.service';
import {FlexPane} from './flex-pane';

@Directive({
  selector: '[nblFlexPaneFixed]',
  providers: [FlexPaneService],
})
export class FlexPaneFixedDirective extends FlexPane implements AfterViewInit, OnDestroy {

  @Input() private observeChanges = false;

  constructor(hostElementRef: ElementRef,
              flexContainerService: FlexContainerService,
              flexPaneService: FlexPaneService,
              ngZone: NgZone) {
    super(hostElementRef, flexContainerService, flexPaneService, ngZone);
  }

  public ngAfterViewInit(): void {

    this.flexContainer.addFixedPane(this);

    if (this.observeChanges) {
      this.subscriptions.push(fromMutationObserver(this.hostElement).pipe(
        debounceTime(100),
      ).subscribe(() => this.flexContainer.forceUpdate()));
    }

  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
    this.flexContainer.removeFixedPane(this);
  }
}
