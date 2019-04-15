import * as React from 'react';
import { Omit } from 'utility-types';
import {
  useField,
  BasicModel,
  FieldModel,
  IFormFieldChildProps,
  IFieldMeta,
  IValidator,
} from 'formulr';

import { FormControl, IFormControlProps } from '../Control';
import Input, { IInputProps } from '../../input';
import { formFirstError } from '../Error';

export interface IFormFieldViewDrivenProps<T> {
  name: T;
  defaultValue?: T;
  required?: boolean;
  validators?: Array<IValidator<T>>;
}

export interface IFormInputFieldProps
  extends Omit<IInputProps, 'onChange' | 'value' | 'name'>,
    IFormControlProps<string> {}

export type IFormModelProps<Value, Model extends BasicModel<Value>> =
  | IFormFieldViewDrivenProps<string>
  | {
      model: Model;
    };

export const FormInputField: React.FunctionComponent<
  IFormInputFieldProps & IFormModelProps<string, FieldModel<string>>
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
  const [inputProps, { error }] = field;
  const { className, style, label, prefix } = props;
  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    inputProps.onChange(e.target.value);
  }
  return (
    <FormControl
      className={className}
      style={style}
      label={label}
      prefix={prefix}
    >
      <Input {...inputProps} onChange={onChange} />
      {formFirstError(error)}
    </FormControl>
  );
};
