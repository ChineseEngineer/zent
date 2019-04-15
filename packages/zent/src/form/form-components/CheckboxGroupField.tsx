import * as React from 'react';
import { Omit } from 'utility-types';
import { ICheckboxGroupProps, CheckboxGroup } from '../../checkbox';
import { IFormControlProps, FormControl } from '../Control';
import { formFirstError } from '../Error';
import {
  useField,
  IFormFieldCommonProps,
  noopMapEventToValue,
} from '../shared';

export interface IFormCheckboxGroupFieldProps<T>
  extends Omit<ICheckboxGroupProps, 'value' | 'onChange'>,
    IFormControlProps<T[]> {
  children?: React.ReactNode;
}

export function FormCheckboxGroupProps<T>(
  props: IFormCheckboxGroupFieldProps<T> & IFormFieldCommonProps<T[]>
) {
  const [childProps, { error }] = useField(props, [], noopMapEventToValue);
  const {
    className,
    style,
    label,
    prefix,
    children,
    renderError = formFirstError,
    ...otherProps
  } = props;
  return (
    <FormControl
      className={className}
      style={style}
      label={label}
      prefix={prefix}
    >
      <CheckboxGroup {...otherProps} {...childProps}>
        {children}
      </CheckboxGroup>
      {renderError(error)}
    </FormControl>
  );
}
