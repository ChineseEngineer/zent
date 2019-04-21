import * as React from 'react';
import { Omit } from 'utility-types';

import { IRadioGroupProps, RadioGroup, IRadioEvent } from '../../radio';
import { IFormFieldCommonProps, useField } from '../shared';
import { FormControl, IFormControlProps } from '../Control';
import { formFirstError } from '../Error';
import { FormNotice } from '../Notice';
import { FormDescription } from '../Description';

export interface IFormRadioGroupFieldProps
  extends Omit<IRadioGroupProps, 'value' | 'onChange'>,
    IFormControlProps<unknown> {}

function mapRadioEvent(e: IRadioEvent) {
  return e.target.value;
}

export const FormRadioGroupField: React.FunctionComponent<
  IFormRadioGroupFieldProps & IFormFieldCommonProps<unknown>
> = props => {
  const [childProps, { error }] = useField(props, '', mapRadioEvent);
  const {
    className,
    style,
    label,
    prefix,
    renderError = formFirstError,
    children,
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
      required={required}
    >
      <RadioGroup prefix={prefix} {...otherProps} {...childProps}>
        {children}
      </RadioGroup>
      {!!notice && <FormNotice prefix={prefix}>{notice}</FormNotice>}
      {!!description && (
        <FormDescription prefix={prefix}>{description}</FormDescription>
      )}
      {renderError(error)}
    </FormControl>
  );
};
