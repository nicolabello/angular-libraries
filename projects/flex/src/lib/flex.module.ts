import {NgModule} from '@angular/core';
import {FlexRootComponent} from './components/flex-root/flex-root.component';
import {FlexContainerHorizontalDirective} from './directives/flex-container/flex-container-horizontal.directive';
import {FlexContainerVerticalDirective} from './directives/flex-container/flex-container-vertical.directive';
import {FlexPaneDynamicDirective} from './directives/flex-pane/flex-pane-dynamic.directive';
import {FlexPaneFixedDirective} from './directives/flex-pane/flex-pane-fixed.directive';

@NgModule({
  declarations: [
    FlexContainerHorizontalDirective,
    FlexContainerVerticalDirective,
    FlexPaneDynamicDirective,
    FlexPaneFixedDirective,
    FlexRootComponent,
  ],
  exports: [
    FlexContainerHorizontalDirective,
    FlexContainerVerticalDirective,
    FlexPaneDynamicDirective,
    FlexPaneFixedDirective,
    FlexRootComponent,
  ],
})
export class FlexModule {
}
