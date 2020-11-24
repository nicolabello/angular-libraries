import {AfterViewInit, Directive, ElementRef, NgZone, OnDestroy} from '@angular/core';
import {FlexContainerService} from '../../services/flex-container.service';
import {FlexPaneService} from '../../services/flex-pane.service';
import {FlexPane} from './flex-pane';

@Directive({
  selector: '[nblFlexPaneDynamic]',
  providers: [FlexPaneService],
})
export class FlexPaneDynamicDirective extends FlexPane implements AfterViewInit, OnDestroy {

  constructor(hostElementRef: ElementRef,
              flexContainerService: FlexContainerService,
              flexPaneService: FlexPaneService,
              ngZone: NgZone) {
    super(hostElementRef, flexContainerService, flexPaneService, ngZone);
  }

  public ngAfterViewInit() {
    this.flexContainer.setDynamicPane(this);
  }

  public ngOnDestroy() {
    super.ngOnDestroy();
    this.flexContainer.unsetDynamicPane(this);
  }
}
