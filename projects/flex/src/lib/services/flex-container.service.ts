import {Injectable} from '@angular/core';
import {FlexContainer} from '../directives/flex-container/flex-container';

@Injectable()
export class FlexContainerService {

  // @ts-ignore
  private _flexContainer: FlexContainer;

  public get flexContainer(): FlexContainer {
    return this._flexContainer;
  }

  public set flexContainer(flexContainer: FlexContainer) {
    this._flexContainer = this._flexContainer || flexContainer;
  }

}

