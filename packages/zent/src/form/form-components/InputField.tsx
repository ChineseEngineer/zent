import * as React from 'react';
import { Omit } from 'utility-types';

import { FormControl, IFormControlProps } from '../Control';
import Input, { IInputProps, IInputChangeEvent } from '../../input';
import { formFirstError } from '../Error';
import { useField, IFormFieldCommonProps } from '../shared';

export interface IFormInputFieldProps
  extends Omit<IInputProps, 'onChange' | 'value' | 'name'>,
    IFormControlProps<string> {}

function mapInputEventToValue(
  e: IInputChangeEvent | React.ChangeEvent<HTMLInputElement>
) {
  return e.target.value;
}

export const FormInputField: React.FunctionComponent<
  IFormInputFieldProps & IFormFieldCommonProps<string>
> = props => {
  const [childProps, { error }] = useField(props, '', mapInputEventToValue);
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
      <Input {...otherProps} {...childProps} />
      {renderError(error)}
    </FormControl>
  );
};
