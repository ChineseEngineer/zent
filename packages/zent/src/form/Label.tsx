import * as React from 'react';
import cx from 'classnames';

export interface ILabelProps {
  prefix?: string;
  required?: boolean;
}

export const Label: React.FunctionComponent<ILabelProps> = ({
  children,
  prefix = 'zent',
  required,
}) => (
  <label
    className={cx(`${prefix}-form-label`, {
      [`${prefix}-form-label-required`]: required,
    })}
  >
    {children}
  </label>
);
