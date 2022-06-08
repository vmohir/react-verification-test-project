import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import PropTypes from 'prop-types';
import './Button.css';

interface props extends ButtonHTMLAttributes<any> {
  children: ReactNode;
  className?: string;
}

const Button: React.FC<props> = ({ children, className, ...rest }) => {
  return (
    <button className={'button ' + className} {...rest}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['submit', 'button'] as const),
  onClick: PropTypes.func,
};

export default Button;
