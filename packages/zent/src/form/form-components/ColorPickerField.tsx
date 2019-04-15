import * as React from 'react';
import { Omit } from 'utility-types';
import ColorPicker, { IColorPickerProps } from '../../colorpicker';
import { IFormControlProps, FormControl } from '../Control';
import { formFirstError } from '../Error';
import {
  useField,
  IFormFieldCommonProps,
  noopMapEventToValue,
} from '../shared';

export interface IFormColorPickerFieldProps
  extends Omit<IColorPickerProps, 'color' | 'onChange'>,
    IFormControlProps<string> {}

export const FormColorPickerField: React.FunctionComponent<
  IFormColorPickerFieldProps & IFormFieldCommonProps<string>
> = props => {
  const [{ value, ...passedProps }, { error }] = useField<string>(
    props,
    '',
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
    <FormControl
      className={className}
      style={style}
      label={label}
      prefix={prefix}
    >
      <ColorPicker {...otherProps} {...passedProps} color={value} />
      {renderError(error)}
    </FormControl>
  );
};
