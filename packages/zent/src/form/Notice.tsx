import * as React from 'react';
import cx from 'classnames';

export interface IFormNoticeProps {
  prefix?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const FormNotice: React.FunctionComponent<IFormNoticeProps> = ({
  prefix = 'zent',
  className,
  style,
  children,
}) => (
  <div className={cx(`${prefix}-form-notice`, className)} style={style}>
    {children}
  </div>
);
