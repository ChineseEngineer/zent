import * as React from 'react';
import { Omit } from 'utility-types';
import {
  useField,
  FieldModel,
  IFormFieldChildProps,
  IFieldMeta,
} from 'formulr';

import NumberInput, { INumberInputProps } from '../../number-input';
import { IFormFieldViewDrivenProps } from '../types';
import { IFormControlProps, FormControl } from '../Control';
import { formFirstError } from '../Error';

export interface IFormNumberInputFieldProps
  extends Omit<INumberInputProps, 'onChange' | 'value' | 'name'>,
    IFormControlProps<string> {}

export type IFormNumberInputFieldModelProps =
  | IFormFieldViewDrivenProps<string>
  | {
      mode: FieldModel<string>;
    };

export const NumberInputField: React.FunctionComponent<
  IFormNumberInputFieldProps & IFormNumberInputFieldModelProps
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
  return (
    <FormControl
      className={className}
      style={style}
      label={label}
      prefix={prefix}
    >
      <NumberInput {...inputProps} />
      {formFirstError(error)}
    </FormControl>
  );
};
