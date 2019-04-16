import * as React from 'react';
import { Omit } from 'utility-types';
import QuarterPicker, {
  IQuarterPickerProps,
  QuarterPickerValue,
} from '../../datetimepicker/QuarterPicker';
import { IFormControlProps, FormControl } from '../Control';
import {
  IFormFieldCommonProps,
  noopMapEventToValue,
  useField,
} from '../shared';
import { formFirstError } from '../Error';

export interface IFormQuarterPickerFieldProps
  extends Omit<IQuarterPickerProps, 'value' | 'onChange'>,
    IFormControlProps<QuarterPickerValue> {}

export const FormQuarterPickerField: React.FunctionComponent<
  IFormQuarterPickerFieldProps & IFormFieldCommonProps<QuarterPickerValue>
> = props => {
  const [childProps, { error }] = useField(props, [], noopMapEventToValue);
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
      <QuarterPicker {...otherProps} {...childProps} />
      {renderError(error)}
    </FormControl>
  );
};
