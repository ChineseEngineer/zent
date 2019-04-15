import * as React from 'react';
import { Omit } from 'utility-types';
import {
  FieldModel,
  IFormFieldChildProps,
  IFieldMeta,
  useField,
} from 'formulr';
import { ICheckboxGroupProps, CheckboxGroup } from '../../checkbox';
import { IFormControlProps, FormControl } from '../Control';
import { IFormFieldViewDrivenProps } from '../types';
import { formFirstError } from '../Error';

export interface IFormCheckboxGroupFieldProps<T>
  extends Omit<ICheckboxGroupProps, 'value' | 'onChange'>,
    IFormControlProps<T[]> {
  children?: React.ReactNode;
}

export type IFormCheckboxGroupModelProps<T> =
  | IFormFieldViewDrivenProps<T[]>
  | {
      model: FieldModel<string>;
    };

export function FormCheckboxGroupProps<T>(
  props: IFormCheckboxGroupFieldProps<T> & IFormCheckboxGroupModelProps<T>
) {
  let field: [IFormFieldChildProps<T[]>, IFieldMeta<T[]>, FieldModel<T[]>];
  if ((props as any).name) {
    field = useField<T[]>((field as any).name, (field as any).defaultValue);
  } else {
    field = useField<T[]>((field as any).model);
  }
  const [childProps, { error }] = field;
  const { className, style, label, prefix, children } = props;
  return (
    <FormControl
      className={className}
      style={style}
      label={label}
      prefix={prefix}
    >
      <CheckboxGroup {...childProps}>{children}</CheckboxGroup>
      {formFirstError(error)}
    </FormControl>
  );
}
