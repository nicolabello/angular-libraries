export interface MDCTextFieldProps {
  required?: boolean;
  disabled?: boolean;
  valid?: boolean;
  value?: any;
}

export interface MDCSelectProps extends MDCTextFieldProps {
  onChange?: (value: string) => void;
}
