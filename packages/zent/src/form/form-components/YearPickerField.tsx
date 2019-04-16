import * as React from 'react';
import { Omit } from 'utility-types';
import { IFormControlProps, FormControl } from '../Control';
import {
  IFormFieldCommonProps,
  useField,
  noopMapEventToValue,
  dateDefaultValueFactory,
} from '../shared';
import { formFirstError } from '../Error';
import YearPicker, { IYearPickerProps } from '../../datetimepicker/YearPicker';
import { DatePickers } from '../../datetimepicker/common/types';

export interface IFormYearPickerFieldProps
  extends Omit<IYearPickerProps, 'value' | 'onChange'>,
    IFormControlProps<DatePickers.Value> {}

export const FormYearPickerField: React.FunctionComponent<
  IFormYearPickerFieldProps & IFormFieldCommonProps<DatePickers.Value>
> = props => {
  const [childProps, { error }] = useField(
    props,
    dateDefaultValueFactory,
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
      <YearPicker {...otherProps} {...childProps} />
      {renderError(error)}
    </FormControl>
  );
};
