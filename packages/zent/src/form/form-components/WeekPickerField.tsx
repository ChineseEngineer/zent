import * as React from 'react';
import { Omit } from 'utility-types';
import { IFormControlProps, FormControl } from '../Control';
import {
  IFormFieldCommonProps,
  useField,
  noopMapEventToValue,
} from '../shared';
import { formFirstError } from '../Error';
import WeekPicker, { IWeekPickerProps } from '../../datetimepicker/WeekPicker';
import { FormDescription } from '../Description';
import { FormNotice } from '../Notice';

export interface IFormWeekPickerFieldProps
  extends Omit<IWeekPickerProps, 'value' | 'onChange'>,
    IFormControlProps<[Date?, Date?]> {}

export const FormWeekPickerField: React.FunctionComponent<
  IFormWeekPickerFieldProps & IFormFieldCommonProps<[Date?, Date?]>
> = props => {
  const [childProps, { error }] = useField(props, [], noopMapEventToValue);
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
      <WeekPicker prefix={prefix} {...otherProps} {...childProps} />
      {!!notice && <FormNotice prefix={prefix}>{notice}</FormNotice>}
      {!!description && (
        <FormDescription prefix={prefix}>{description}</FormDescription>
      )}
      {renderError(error)}
    </FormControl>
  );
};
