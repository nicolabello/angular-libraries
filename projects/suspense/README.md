# Suspense
Suspense for Angular

## Usage

```html

<nbl-suspense [data]="data" [loading]="loading" [error]="error">
  <ng-container *nblSuspenseIfData="let item ofType data">Data: {{ item | json }}</ng-container>
  <ng-container *nblSuspenseIfEmpty="let item ofType data">Empty: {{ item | json }}</ng-container>
  <ng-container *nblSuspenseIfLoading="let item ofType loading">Loading: {{ item | json }}</ng-container>
  <ng-container *nblSuspenseIfError="let item ofType error">Error: {{ item | json }}</ng-container>
</nbl-suspense>
```
