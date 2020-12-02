import {Directive, HostListener, Input} from '@angular/core';
import {DynamicRouterService} from '../services/dynamic-router.service';

@Directive({
  selector: '[nblDynamicRouterLink]',
})
export class DynamicRouterLinkDirective {

  @Input('nblDynamicRouterLink') private commands?: any[];

  constructor(private routerService: DynamicRouterService) {
  }

  @HostListener('click')
  public onClick(): void {
    this.routerService.navigate(this.commands || []);
  }

}
