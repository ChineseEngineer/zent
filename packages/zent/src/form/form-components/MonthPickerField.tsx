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
import { FormDescription } from '../Description';
import { FormNotice } from '../Notice';

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
      <MonthPicker prefix={prefix} {...otherProps} {...childProps} />
      {!!notice && <FormNotice prefix={prefix}>{notice}</FormNotice>}
      {!!description && (
        <FormDescription prefix={prefix}>{description}</FormDescription>
      )}
      {renderError(error)}
    </FormControl>
  );
};
