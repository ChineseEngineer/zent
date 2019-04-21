import * as React from 'react';
import cx from 'classnames';

import { Label } from './Label';

export interface IFormControlProps<T> {
  className?: string;
  style?: React.CSSProperties;
  label?: React.ReactNode;
  prefix?: string;
  children?: React.ReactNode;
  required?: boolean;
}

export const FormControl = React.forwardRef<
  HTMLDivElement,
  IFormControlProps<unknown>
>(({ className, style, label, prefix = 'zent', children, required }, ref) => {
  return (
    <div
      ref={ref}
      className={cx(`${prefix}-form-control`, className)}
      style={style}
    >
      <Label prefix={prefix} required={required}>
        {label}
      </Label>
      <div className={cx(`${prefix}-form-control-content`)}>{children}</div>
    </div>
  );
});

FormControl.displayName = 'ZentFormControl';
