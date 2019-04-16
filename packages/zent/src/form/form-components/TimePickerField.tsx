import * as React from 'react';
import { Omit } from 'utility-types';
import { IFormControlProps, FormControl } from '../Control';
import { DatePickers } from '../../datetimepicker/common/types';
import {
  IFormFieldCommonProps,
  useField,
  noopMapEventToValue,
  dateDefaultValueFactory,
} from '../shared';
import { formFirstError } from '../Error';
import TimePicker, { ITimePickerProps } from '../../datetimepicker/TimePicker';

export interface IFormTimePickerField
  extends Omit<ITimePickerProps, 'onChange' | 'value'>,
    IFormControlProps<DatePickers.Value> {}

export const FormTimePickerField: React.FunctionComponent<
  IFormTimePickerField & IFormFieldCommonProps<DatePickers.Value>
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
      <TimePicker {...otherProps} {...childProps} />
      {renderError(error)}
    </FormControl>
  );
};
