import * as React from 'react';
import { Omit } from 'utility-types';

import { IRadioGroupProps, RadioGroup } from '../../radio';
import {
  IFormFieldCommonProps,
  noopMapEventToValue,
  useField,
} from '../shared';
import { FormControl, IFormControlProps } from '../Control';
import { formFirstError } from '../Error';

export interface IFormRadioGroupFieldProps
  extends Omit<IRadioGroupProps, 'value' | 'onChange'>,
    IFormControlProps<unknown> {}

export const FormRadioGroupField: React.FunctionComponent<
  IFormRadioGroupFieldProps & IFormFieldCommonProps<unknown>
> = props => {
  const [childProps, { error }] = useField(props, '', noopMapEventToValue);
  const {
    className,
    style,
    label,
    prefix,
    renderError = formFirstError,
    children,
    ...otherProps
  } = props;
  return (
    <FormControl
      className={className}
      style={style}
      label={label}
      prefix={prefix}
    >
      <RadioGroup {...otherProps} {...childProps}>
        {children}
      </RadioGroup>
      {formFirstError(error)}
    </FormControl>
  );
};
