import * as React from 'react';
import { Omit } from 'utility-types';
import Checkbox, { ICheckboxProps, ICheckboxEvent } from '../../checkbox';
import { FormControl, IFormControlProps } from '../Control';
import { formFirstError } from '../Error';
import {
  useField,
  IFormFieldCommonProps,
  IFormFieldSharedProps,
} from '../shared';
import { FormDescription } from '../Description';
import { FormNotice } from '../Notice';

export interface IFormCheckboxFieldProps
  extends Omit<ICheckboxProps, 'onChange' | 'checked'>,
    IFormControlProps<boolean> {}

function mapCheckboxEventToValue(e: ICheckboxEvent) {
  return e.target.checked;
}

export const FormCheckboxField = (
  props: IFormCheckboxFieldProps & IFormFieldCommonProps<boolean>
) => {
  const [{ value, ...passedProps }, { error }] = useField<
    boolean,
    ICheckboxEvent
  >(
    props as IFormFieldSharedProps<boolean, ICheckboxEvent>,
    false,
    mapCheckboxEventToValue
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
    >
      <Checkbox
        prefix={prefix}
        {...otherProps}
        {...passedProps}
        checked={value}
      />
      {!!notice && <FormNotice prefix={prefix}>{notice}</FormNotice>}
      {!!description && (
        <FormDescription prefix={prefix}>{description}</FormDescription>
      )}
      {renderError(error)}
    </FormControl>
  );
};
