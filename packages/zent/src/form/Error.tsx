import * as React from 'react';
import { IError, IErrors } from 'formulr';
import cx from 'classnames';

export interface IFormErrorProps {
  prefix?: string;
  className?: string;
  style?: React.CSSProperties;
  error: IError<unknown>;
}

export function formFirstError<T>(errors: IErrors<T>) {
  if (!errors || !errors.length) {
    return null;
  }
  const error = errors[0];
  return <FormError error={error} />;
}

export const FormError = React.forwardRef<HTMLDivElement, IFormErrorProps>(
  ({ error, className, style, prefix = 'zent' }, ref) => (
    <div
      ref={ref}
      className={cx(`${prefix}-form-error`, className)}
      style={style}
    >
      {error.error}
    </div>
  )
);

FormError.displayName = 'ZentFormError';
