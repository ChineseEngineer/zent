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
import DateRangePicker, {
  IDateRangePickerProps,
} from '../../datetimepicker/DateRangePicker';
import { FormDescription } from '../Description';
import { FormNotice } from '../Notice';

export interface IFormDateRangePickerFieldProps
  extends Omit<IDateRangePickerProps, 'onChange' | 'value'>,
    IFormControlProps<DatePickers.RangeValue> {}

function dateDefaultValueFactory(): DatePickers.RangeValue {
  return [new Date(), new Date()];
}

export const FormDateRangePickerField: React.FunctionComponent<
  IFormDateRangePickerFieldProps & IFormFieldCommonProps<DatePickers.RangeValue>
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
      <DateRangePicker prefix={prefix} {...otherProps} {...childProps} />
      {!!notice && <FormNotice prefix={prefix}>{notice}</FormNotice>}
      {!!description && (
        <FormDescription prefix={prefix}>{description}</FormDescription>
      )}
      {renderError(error)}
    </FormControl>
  );
};
