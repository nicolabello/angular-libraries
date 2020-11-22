import {NgModule} from '@angular/core';
import {SuspenseComponent} from './components/suspense.component';
import {SuspenseIfDataDirective} from './directives/suspense-if-data.directive';
import {SuspenseIfEmptyDirective} from './directives/suspense-if-empty.directive';
import {SuspenseIfErrorDirective} from './directives/suspense-if-error.directive';
import {SuspenseIfLoadingDirective} from './directives/suspense-if-loading.directive';

@NgModule({
  declarations: [SuspenseComponent, SuspenseIfEmptyDirective, SuspenseIfDataDirective, SuspenseIfErrorDirective, SuspenseIfLoadingDirective],
  imports: [],
  exports: [SuspenseComponent, SuspenseIfEmptyDirective, SuspenseIfDataDirective, SuspenseIfErrorDirective, SuspenseIfLoadingDirective],
})
export class SuspenseModule {
}
