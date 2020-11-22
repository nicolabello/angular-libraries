import {Injectable, OnDestroy} from '@angular/core';
import {merge, Observable} from 'rxjs';
import {SuspenseValue} from '../helpers/suspense-value';
import {SuspenseData, SuspenseError, SuspenseLoading} from '../models/suspense-types';

@Injectable()
export class SuspenseService implements OnDestroy {

  public data = new SuspenseValue<SuspenseData>();
  public loading = new SuspenseValue<SuspenseLoading>();
  public error = new SuspenseValue<SuspenseError>();

  public get changes(): Observable<void> {
    return merge(this.data.changes, this.loading.changes, this.error.changes);
  }

  public ngOnDestroy(): void {
    this.data.unsubscribe();
    this.loading.unsubscribe();
    this.error.unsubscribe();
  }

}
