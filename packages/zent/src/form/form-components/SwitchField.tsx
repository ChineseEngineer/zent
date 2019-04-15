import * as React from 'react';
import { Omit } from 'utility-types';
import Switch, { ISwitchProps } from '../../switch';
import { IFormControlProps, FormControl } from '../Control';
import {
  IFormFieldCommonProps,
  useField,
  noopMapEventToValue,
} from '../shared';
import { formFirstError } from '../Error';

export interface IFormSwitchFieldProps
  extends Omit<ISwitchProps, 'onChange' | 'checked'>,
    IFormControlProps<boolean> {}

export const FormSwitchField: React.FunctionComponent<
  IFormSwitchFieldProps & IFormFieldCommonProps<boolean>
> = props => {
  const [{ value, ...childProps }, { error }] = useField(
    props,
    false,
    noopMapEventToValue
  );
  const {
    className,
    style,
    label,
    prefix,
    renderError = formFirstError,
    ...otherProps
  } = props;
  return (
    <FormControl>
      <Switch {...otherProps} {...childProps} checked={value} />
      {renderError(error)}
    </FormControl>
  );
};
