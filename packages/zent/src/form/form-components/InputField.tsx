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

export type IFormInputFieldModelProps =
  | IFormFieldViewDrivenProps<string>
  | {
      model: FieldModel<string>;
    };

export const FormInputField: React.FunctionComponent<
  IFormInputFieldProps & IFormInputFieldModelProps
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
  const onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      inputProps.onChange(e.target.value);
    },
    [inputProps.onChange]
  );
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
