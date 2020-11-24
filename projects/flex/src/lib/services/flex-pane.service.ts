import {Injectable} from '@angular/core';
import {FlexPane} from '../directives/flex-pane/flex-pane';

@Injectable()
export class FlexPaneService {

  // @ts-ignore
  private _flexPane: FlexPane;

  public get flexPane(): FlexPane {
    return this._flexPane;
  }

  public set flexPane(flexPane: FlexPane) {
    this._flexPane = this._flexPane || flexPane;
  }

}

