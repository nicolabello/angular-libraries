import {Component, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {SuspenseComponent} from '../components/suspense.component';
import {SuspenseIfLoadingDirective} from './suspense-if-loading.directive';

const testCases = [
  {
    data: null,
    loading: false,
    error: null,
    visible: false,
  },
  {
    data: null,
    loading: false,
    error: 'ops',
    visible: false,
  },
  {
    data: null,
    loading: true,
    error: null,
    visible: true,
  },
  {
    data: null,
    loading: true,
    error: 'ops',
    visible: true,
  },
  {
    data: 'data',
    loading: false,
    error: null,
    visible: false,
  },
  {
    data: 'data',
    loading: false,
    error: 'ops',
    visible: false,
  },
  {
    data: 'data',
    loading: true,
    error: null,
    visible: true,
  },
  {
    data: 'data',
    loading: true,
    error: 'ops',
    visible: true,
  },
];

@Component({
  template: `
    <nbl-suspense [data]="data" [loading]="loading" [error]="error">
      <ng-container *nblSuspenseIfLoading="let loading">Loading: {{ loading }}</ng-container>
    </nbl-suspense>
  `,
})
class TestComponent {
  public data: any;
  public loading: any;
  public error: any;

  @ViewChild(SuspenseIfLoadingDirective) public suspenseIfDirective?: SuspenseIfLoadingDirective<any>;
}

describe('SuspenseIfLoadingDirective', () => {

  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let directive: SuspenseIfLoadingDirective<any> | undefined;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TestComponent, SuspenseComponent, SuspenseIfLoadingDirective],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    fixture.whenStable();
    directive = component.suspenseIfDirective;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(directive).toBeTruthy();
  });

  it('should be visible when expected', () => {
    for (const testCase of testCases) {
      component.data = testCase.data;
      component.loading = testCase.loading;
      component.error = testCase.error;

      fixture.detectChanges();
      fixture.whenStable();

      expect(directive?.value).toBe(testCase.loading);
      testCase.visible ? expect(directive?.isVisible).toBeTruthy() : expect(directive?.isVisible).toBeFalsy();
    }
  });

});
