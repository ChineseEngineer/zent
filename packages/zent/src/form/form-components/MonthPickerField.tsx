import * as React from 'react';
import { Omit } from 'utility-types';
import MonthPicker, {
  IMonthPickerProps,
} from '../../datetimepicker/MonthPicker';
import { IFormControlProps, FormControl } from '../Control';
import { DatePickers } from '../../datetimepicker/common/types';
import {
  IFormFieldCommonProps,
  useField,
  noopMapEventToValue,
  dateDefaultValueFactory,
} from '../shared';
import { formFirstError } from '../Error';

export interface IFormMonthPickerFieldProps
  extends Omit<IMonthPickerProps, 'value' | 'onChange'>,
    IFormControlProps<DatePickers.Value> {}

export const FormMonthPickerField: React.FunctionComponent<
  IFormMonthPickerFieldProps & IFormFieldCommonProps<DatePickers.Value>
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
      <MonthPicker {...otherProps} {...childProps} />
      {renderError(error)}
    </FormControl>
  );
};
