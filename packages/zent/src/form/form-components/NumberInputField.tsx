import * as React from 'react';
import { Omit } from 'utility-types';

import NumberInput, { INumberInputProps } from '../../number-input';
import { IFormControlProps, FormControl } from '../Control';
import { formFirstError } from '../Error';
import {
  IFormFieldCommonProps,
  useField,
  noopMapEventToValue,
} from '../shared';

export interface IFormNumberInputFieldProps
  extends Omit<INumberInputProps, 'onChange' | 'value' | 'name'>,
    IFormControlProps<string> {}

export const NumberInputField: React.FunctionComponent<
  IFormNumberInputFieldProps & IFormFieldCommonProps<string>
> = props => {
  const [childProps, { error }] = useField(props, '', noopMapEventToValue);
  const {
    className,
    style,
    label,
    prefix,
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
      <NumberInput {...otherProps} {...childProps} />
      {renderError(error)}
    </FormControl>
  );
};
