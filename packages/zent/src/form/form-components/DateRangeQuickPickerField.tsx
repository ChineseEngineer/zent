import * as React from 'react';
import { Omit } from 'utility-types';
import DateRangeQuickPicker, {
  IDateRangeQuickPickerProps,
} from '../../date-range-quick-picker';
import { IFormControlProps, FormControl } from '../Control';
import { DatePickers } from '../../datetimepicker/common/types';
import {
  IFormFieldCommonProps,
  noopMapEventToValue,
  useField,
  IFormFieldSharedProps,
} from '../shared';
import { formFirstError } from '../Error';
import { FormDescription } from '../Description';
import { FormNotice } from '../Notice';

export interface IFormDateRangeQuickPickerFieldProps
  extends Omit<IDateRangeQuickPickerProps, 'onChange' | 'value'>,
    IFormControlProps<DatePickers.RangeValue> {}

function dateDefaultValueFactory(): DatePickers.RangeValue {
  return [new Date(), new Date()];
}

export const FormDateRangeQuickPickerField: React.FunctionComponent<
  IFormDateRangeQuickPickerFieldProps &
    IFormFieldCommonProps<DatePickers.RangeValue>
> = props => {
  const [childProps, { error }] = useField<DatePickers.RangeValue>(
    props as Partial<IFormFieldSharedProps<DatePickers.RangeValue>>,
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
      <DateRangeQuickPicker prefix={prefix} {...otherProps} {...childProps} />
      {!!notice && <FormNotice prefix={prefix}>{notice}</FormNotice>}
      {!!description && (
        <FormDescription prefix={prefix}>{description}</FormDescription>
      )}
      {renderError(error)}
    </FormControl>
  );
};
