import * as React from 'react';
import cx from 'classnames';

export function useForm() {}

export interface IFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  type: 'horizontal' | 'vertical';
  prefix?: string;
}

export const Form = React.forwardRef<HTMLFormElement, IFormProps>(
  ({ children, className, prefix = 'zent', type, ...props }, ref) => {
    return (
      <form
        ref={ref}
        {...props}
        className={cx(
          `${prefix}-form`,
          {
            [`${prefix}-form-vertical`]: type === 'vertical',
            [`${prefix}-form-horizontal`]: type === 'horizontal',
          },
          className
        )}
      >
        {children}
      </form>
    );
  }
);

Form.displayName = 'ZentForm';
