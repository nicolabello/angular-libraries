# Suspense

## Usage

```html

<nbl-suspense [data]="data" [loading]="loading" [error]="error">
  <ng-container *nblSuspenseIfData="let data">Data: {{ data | json }}</ng-container>
  <ng-container *nblSuspenseIfEmpty="let data">Empty: {{ data | json }}</ng-container>
  <ng-container *nblSuspenseIfLoading="let loading">Loading: {{ loading | json }}</ng-container>
  <ng-container *nblSuspenseIfError="let error">Error: {{ error | json }}</ng-container>
</nbl-suspense>
```
