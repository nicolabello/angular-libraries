import {AfterViewInit, Directive, Input, OnDestroy} from '@angular/core';
import {fromMutationObserver} from '@nicolabello/ng-helpers';
import {debounceTime} from 'rxjs/operators';
import {FlexPaneService} from '../../services/flex-pane.service';
import {FlexPane} from './flex-pane';

@Directive({
  selector: '[nblFlexPaneFixed]',
  providers: [FlexPaneService],
})
export class FlexPaneFixedDirective extends FlexPane implements AfterViewInit, OnDestroy {

  @Input() public observeChanges = false;

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
