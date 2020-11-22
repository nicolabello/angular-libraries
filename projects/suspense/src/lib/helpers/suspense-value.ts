import { isObservable, Observable, Subject, Subscription } from 'rxjs';
import {SuspenseInput} from '../models/suspense-types';

function isPromise(promise: any): boolean {
  return typeof promise?.then === 'function';
}

export class SuspenseValue<T = any> {
  public value: T | null = null;
  public booleanValue = false;
  private valueSubscription: Subscription | null = null;

  private changeSubject = new Subject<void>();

  public get changes(): Observable<void> {
    return this.changeSubject.asObservable();
  }

  public async init(source: SuspenseInput<T>): Promise<any> {
    this.unsubscribe();

    if (isObservable(source)) {
      this.valueSubscription = source.subscribe((value: T) => {
        this.value = value;
        this.booleanValue = this.toBoolean(this.value);
        this.changeSubject.next();
      });
      return;
    }

    if (isPromise(source)) {
      this.value = await source;
      this.booleanValue = this.toBoolean(this.value);
      this.changeSubject.next();
      return;
    }

    this.value = source as T;
    this.booleanValue = this.toBoolean(this.value);
    this.changeSubject.next();
  }

  private toBoolean(value: T): boolean {
    if (Array.isArray(value)) {
      return !!value.length;
    }

    if (value && typeof value === 'object') {
      return !!Object.keys(value).length;
    }

    return (value as unknown as number) === 0 || !!value;
  }

  public unsubscribe(): void {
    this.valueSubscription?.unsubscribe();
  }
}
