import {Component} from '@angular/core';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import {CommonValueAccessor} from './common-value-accessor';

@Component({
  template: `
    <input [(ngModel)]="value">
  `,
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: InputComponent, multi: true},
    {provide: NG_VALIDATORS, useExisting: InputComponent, multi: true},
  ],
})
export class InputComponent extends CommonValueAccessor<string> {
}

describe('CommonValueAccessor', () => {

  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [InputComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
