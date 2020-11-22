import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

export type SuspenseInput<T> = T | Observable<T> | Promise<T>;

export type SuspenseData = any;
export type SuspenseLoading = boolean | null;
export type SuspenseError = boolean | string | HttpErrorResponse | null;
