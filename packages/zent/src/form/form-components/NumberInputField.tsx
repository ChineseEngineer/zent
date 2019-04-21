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
import { FormDescription } from '../Description';
import { FormNotice } from '../Notice';

export interface IFormNumberInputFieldProps
  extends Omit<INumberInputProps, 'onChange' | 'value' | 'name'>,
    IFormControlProps<string> {}

export const FormNumberInputField: React.FunctionComponent<
  IFormNumberInputFieldProps & IFormFieldCommonProps<string>
> = props => {
  const [childProps, { error }] = useField(props, '', noopMapEventToValue);
  const {
    className,
    style,
    label,
    prefix,
    renderError = formFirstError,
    required,
    description,
    notice,
    ...otherProps
  } = props;
  return (
    <FormControl
      className={className}
      style={style}
      label={label}
      prefix={prefix}
    >
      <NumberInput prefix={prefix} {...otherProps} {...childProps} />
      {!!notice && <FormNotice prefix={prefix}>{notice}</FormNotice>}
      {!!description && (
        <FormDescription prefix={prefix}>{description}</FormDescription>
      )}
      {renderError(error)}
    </FormControl>
  );
};
