import * as React from 'react';
import cx from 'classnames';

export interface IFormDescriptionProps {
  prefix?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const FormDescription: React.FunctionComponent<
  IFormDescriptionProps
> = ({ children, className, style, prefix = 'zent' }) => (
  <div className={cx(`${prefix}-form-description`, className)} style={style}>
    {children}
  </div>
);
