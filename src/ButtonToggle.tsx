import React from 'react';
import PropTypes from 'prop-types';
import './ButtonToggle.scss';
import Button from './Button';

interface props {
  value?: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
}

const ButtonToggle: React.FC<props> = ({ onValueChange, value, disabled }) => {
  return (
    <div className="button-toggle">
      <Button
        type="button"
        className={value !== true ? 'button-outlined' : ''}
        onClick={() => onValueChange(true)}
        disabled={disabled}
      >
        Yes
      </Button>
      <Button
        type="button"
        className={value !== false ? 'button-outlined' : ''}
        onClick={() => onValueChange(false)}
        disabled={disabled}
      >
        No
      </Button>
    </div>
  );
};

ButtonToggle.propTypes = {
  value: PropTypes.bool,
  onValueChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default ButtonToggle;
