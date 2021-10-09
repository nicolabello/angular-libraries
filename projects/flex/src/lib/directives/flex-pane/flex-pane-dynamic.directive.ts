import {AfterViewInit, Directive, OnDestroy} from '@angular/core';
import {FlexPaneService} from '../../services/flex-pane.service';
import {FlexPane} from './flex-pane';

@Directive({
  selector: '[nblFlexPaneDynamic]',
  providers: [FlexPaneService],
})
export class FlexPaneDynamicDirective extends FlexPane implements AfterViewInit, OnDestroy {

  public ngAfterViewInit(): void {
    this.flexContainer.setDynamicPane(this);
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
    this.flexContainer.unsetDynamicPane(this);
  }
}
