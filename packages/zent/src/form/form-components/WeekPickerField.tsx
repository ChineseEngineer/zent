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
    ...otherProps
  } = props;
  return (
    <FormControl
      className={className}
      style={style}
      label={label}
      prefix={prefix}
    >
      <WeekPicker {...otherProps} {...childProps} />
      {renderError(error)}
    </FormControl>
  );
};
