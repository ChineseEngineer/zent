import * as React from 'react';
import { Omit } from 'utility-types';
import Switch, { ISwitchProps } from '../../switch';
import { IFormControlProps, FormControl } from '../Control';
import {
  IFormFieldCommonProps,
  useField,
  noopMapEventToValue,
  IFormFieldSharedProps,
} from '../shared';
import { formFirstError } from '../Error';
import { FormDescription } from '../Description';
import { FormNotice } from '../Notice';

export interface IFormSwitchFieldProps
  extends Omit<ISwitchProps, 'onChange' | 'checked'>,
    IFormControlProps<boolean> {}

export const FormSwitchField: React.FunctionComponent<
  IFormSwitchFieldProps & IFormFieldCommonProps<boolean>
> = props => {
  const [{ value, ...childProps }, { error }] = useField(
    props as IFormFieldSharedProps<boolean>,
    false,
    noopMapEventToValue
  );
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
      required={required}
    >
      <Switch prefix={prefix} {...otherProps} {...childProps} checked={value} />
      {!!notice && <FormNotice prefix={prefix}>{notice}</FormNotice>}
      {!!description && (
        <FormDescription prefix={prefix}>{description}</FormDescription>
      )}
      {renderError(error)}
    </FormControl>
  );
};
