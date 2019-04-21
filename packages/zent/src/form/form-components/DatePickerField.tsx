import * as React from 'react';
import { Omit } from 'utility-types';
import DatePicker, { IDatePickerProps } from '../../datetimepicker/DatePicker';
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

export interface IFormDatePickerField
  extends Omit<IDatePickerProps, 'onChange' | 'value'>,
    IFormControlProps<DatePickers.Value> {}

export const FormDatePickerField: React.FunctionComponent<
  IFormDatePickerField & IFormFieldCommonProps<DatePickers.Value>
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
      <DatePicker prefix={prefix} {...otherProps} {...childProps} />
      {!!notice && <FormNotice prefix={prefix}>{notice}</FormNotice>}
      {!!description && (
        <FormDescription prefix={prefix}>{description}</FormDescription>
      )}
      {renderError(error)}
    </FormControl>
  );
};
