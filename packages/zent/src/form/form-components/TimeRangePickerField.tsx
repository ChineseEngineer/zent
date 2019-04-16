import * as React from 'react';
import { Omit } from 'utility-types';
import { IFormControlProps, FormControl } from '../Control';
import { DatePickers } from '../../datetimepicker/common/types';
import {
  IFormFieldCommonProps,
  useField,
  noopMapEventToValue,
} from '../shared';
import { formFirstError } from '../Error';
import TimeRangePicker, {
  ITimeRangePickerProps,
} from '../../datetimepicker/TimeRangePicker';

export interface IFormTimeRangePickerFieldProps
  extends Omit<ITimeRangePickerProps, 'onChange' | 'value'>,
    IFormControlProps<[DatePickers.Value, DatePickers.Value]> {}

function dateDefaultValueFactory(): [DatePickers.Value, DatePickers.Value] {
  return [new Date(), new Date()];
}

export const FormTimeRangePickerField: React.FunctionComponent<
  IFormTimeRangePickerFieldProps &
    IFormFieldCommonProps<[DatePickers.Value, DatePickers.Value]>
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
      <TimeRangePicker {...otherProps} {...childProps} />
      {renderError(error)}
    </FormControl>
  );
};
