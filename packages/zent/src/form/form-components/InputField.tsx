import * as React from 'react';
import { Omit } from 'utility-types';
import {
  useField,
  FieldModel,
  IFormFieldChildProps,
  IFieldMeta,
} from 'formulr';

import { FormControl, IFormControlProps } from '../Control';
import Input, { IInputProps } from '../../input';
import { formFirstError } from '../Error';
import { IFormFieldViewDrivenProps } from '../types';

export interface IFormInputFieldProps
  extends Omit<IInputProps, 'onChange' | 'value' | 'name'>,
    IFormControlProps<string> {}

export type IFormInputModelProps =
  | IFormFieldViewDrivenProps<string>
  | {
      model: FieldModel<string>;
    };

export const FormInputField: React.FunctionComponent<
  IFormInputFieldProps & IFormInputModelProps
> = props => {
  let field: [
    IFormFieldChildProps<string>,
    IFieldMeta<string>,
    FieldModel<string>
  ];
  if ((props as any).name) {
    field = useField<string>((field as any).name, (field as any).defaultValue);
  } else {
    field = useField<string>((field as any).model);
  }
  const [childProps, { error }] = field;
  const { className, style, label, prefix } = props;
  const fieldOnChange = childProps.onChange;
  const onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      fieldOnChange(e.target.value);
    },
    [fieldOnChange]
  );
  return (
    <FormControl
      className={className}
      style={style}
      label={label}
      prefix={prefix}
    >
      <Input {...childProps} onChange={onChange} />
      {formFirstError(error)}
    </FormControl>
  );
};
