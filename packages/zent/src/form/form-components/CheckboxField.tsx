import * as React from 'react';
import { Omit } from 'utility-types';
import Checkbox, { ICheckboxProps, ICheckboxEvent } from '../../checkbox';
import { IFormFieldViewDrivenProps } from '../types';
import {
  FieldModel,
  IFormFieldChildProps,
  IFieldMeta,
  useField,
} from 'formulr';
import { FormControl, IFormControlProps } from '../Control';
import { formFirstError } from '../Error';

export interface IFormCheckboxFieldProps
  extends Omit<ICheckboxProps, 'onChange' | 'checked'>,
    IFormControlProps<boolean> {}

export type IFormCheckboxModelProps =
  | IFormFieldViewDrivenProps<boolean>
  | {
      model: FieldModel<boolean>;
    };

export const FormCheckboxField: React.FunctionComponent<
  IFormCheckboxFieldProps & IFormCheckboxModelProps
> = props => {
  let field: [
    IFormFieldChildProps<boolean>,
    IFieldMeta<boolean>,
    FieldModel<boolean>
  ];
  if ((props as any).name) {
    field = useField<boolean>((field as any).name, (field as any).defaultValue);
  } else {
    field = useField<boolean>((field as any).model);
  }
  const [inputProps, { error }] = field;
  const { className, style, label, prefix } = props;
  const onChange = React.useCallback(
    (e: ICheckboxEvent) => {
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
      <Checkbox {...inputProps} onChange={onChange} />
      {formFirstError(error)}
    </FormControl>
  );
};
