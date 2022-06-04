import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import PropTypes from 'prop-types';
import './Button.css';

interface props extends ButtonHTMLAttributes<any> {
  children: ReactNode;
}

const Button: React.FC<props> = ({ children, ...rest }) => {
  return (
    <button className="Button" {...rest}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['submit', 'button'] as const),
  onClick: PropTypes.func,
};

export default Button;
