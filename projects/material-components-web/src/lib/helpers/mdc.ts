import {MDCSelect, MDCTextField} from '@nicolabello/material-components-web';
import {MDCSelectProps, MDCTextFieldProps} from '../types/mdc';

export const toInputValue = (value: any): string => {
  if (typeof value === 'string') {
    return value;
  }
  if (typeof value === 'number') {
    return `${value}`;
  }
  return '';
};

export const updateMDCInstance = (instance?: MDCTextField | MDCSelect, props?: MDCTextFieldProps | MDCSelectProps): void => {
  if (instance && props) {
    const value = toInputValue(props.value);
    if (instance.value !== value) {
      instance.value = value;
    }
    // instance.required = !!props.required;
    // instance.disabled = !!props.disabled;
    instance.valid = !!props.valid;
  }
};
