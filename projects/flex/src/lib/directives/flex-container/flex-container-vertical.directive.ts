import {Directive} from '@angular/core';
import {Size} from '../../models/size';
import {FlexContainerService} from '../../services/flex-container.service';
import {FlexContainer} from './flex-container';

@Directive({
  selector: '[nblFlexContainerVertical]',
  providers: [FlexContainerService],
})
export class FlexContainerVerticalDirective extends FlexContainer {

  protected updateChildren(size: Size): void {

    let fixedPanesBeforeSize = 0;
    for (const pane of this.fixedPanesBefore) {
      pane.width = size.width;
      fixedPanesBeforeSize += pane.height;
    }

    let fixedPanesAfterSize = 0;
    for (const pane of this.fixedPanesAfter) {
      pane.width = size.width;
      fixedPanesAfterSize += pane.height;
    }

    if (this.dynamicPane) {
      this.dynamicPane.width = size.width;
      this.dynamicPane.height = size.height - fixedPanesBeforeSize - fixedPanesAfterSize;
    }

  }

}
