import * as React from 'react';
import { Omit } from 'utility-types';
import ColorPicker, { IColorPickerProps } from '../../colorpicker';
import { IFormControlProps, FormControl } from '../Control';
import { formFirstError } from '../Error';
import {
  useField,
  IFormFieldCommonProps,
  noopMapEventToValue,
  IFormFieldSharedProps,
} from '../shared';
import { FormDescription } from '../Description';
import { FormNotice } from '../Notice';

export interface IFormColorPickerFieldProps
  extends Omit<IColorPickerProps, 'color' | 'onChange'>,
    IFormControlProps<string> {}

export const FormColorPickerField: React.FunctionComponent<
  IFormColorPickerFieldProps & IFormFieldCommonProps<string>
> = props => {
  const [{ value, ...passedProps }, { error }] = useField<string>(
    props as IFormFieldSharedProps<string>,
    '',
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
      <ColorPicker
        prefix={prefix}
        {...otherProps}
        {...passedProps}
        color={value}
      />
      {!!notice && <FormNotice prefix={prefix}>{notice}</FormNotice>}
      {!!description && (
        <FormDescription prefix={prefix}>{description}</FormDescription>
      )}
      {renderError(error)}
    </FormControl>
  );
};
