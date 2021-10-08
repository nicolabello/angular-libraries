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

function conditionallyUpdateAttribute<T>(instance: T, attribute: keyof T, value: any): void {
  if (instance[attribute] !== value) {
    instance[attribute] = value;
  }
}

export const updateMDCInstance = (instance?: MDCTextField | MDCSelect, props?: MDCTextFieldProps | MDCSelectProps): void => {
  if (instance && props) {
    conditionallyUpdateAttribute(instance, 'value', toInputValue(props.value));
    conditionallyUpdateAttribute(instance, 'required', !!props.required);
    conditionallyUpdateAttribute(instance, 'disabled', !!props.disabled);
    conditionallyUpdateAttribute(instance, 'valid', !!props.valid);
  }
};
