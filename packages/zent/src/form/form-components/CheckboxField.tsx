import * as React from 'react';
import { Omit } from 'utility-types';
import Checkbox, { ICheckboxProps, ICheckboxEvent } from '../../checkbox';
import { FormControl, IFormControlProps } from '../Control';
import { formFirstError } from '../Error';
import { useField, IFormFieldCommonProps } from '../shared';

export interface IFormCheckboxFieldProps
  extends Omit<ICheckboxProps, 'onChange' | 'checked'>,
    IFormControlProps<boolean> {}

function mapCheckboxEventToValue(e: ICheckboxEvent) {
  return e.target.value;
}

export const FormCheckboxField: React.FunctionComponent<
  IFormCheckboxFieldProps & IFormFieldCommonProps<boolean>
> = props => {
  const [{ value, ...passedProps }, { error }] = useField<
    boolean,
    ICheckboxEvent
  >(props, false, mapCheckboxEventToValue);
  const { className, style, label, prefix, ...otherProps } = props;
  return (
    <FormControl
      className={className}
      style={style}
      label={label}
      prefix={prefix}
    >
      <Checkbox {...otherProps} {...passedProps} checked={value} />
      {formFirstError(error)}
    </FormControl>
  );
};
