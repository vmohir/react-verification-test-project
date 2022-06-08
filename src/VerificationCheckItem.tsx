import React, { Fragment, KeyboardEventHandler, useState } from 'react';
import { CheckListItem } from './models/check-list-item';
import './VerificationCheckItem.scss';
import ButtonToggle from './ButtonToggle';
import PropTypes from 'prop-types';

interface Props {
  checkItem: CheckListItem;
  isEnabled: boolean;
  onAnswer: (answer: boolean) => void;
}

const VerificationCheckItem = React.forwardRef<HTMLLIElement, Props>(
  ({ checkItem: { id, description }, isEnabled, onAnswer }, ref) => {
    const [value, setValue] = useState<boolean | undefined>();

    const onKeyDown: KeyboardEventHandler = event => {
      if (event.key === '1') {
        updateValue(true);
      } else if (event.key === '2') {
        updateValue(false);
      }
    };

    function updateValue(newValue: boolean) {
      setValue(newValue);
      onAnswer(newValue);
    }
    return (
      <Fragment>
        <li
          id={'verification-check-item-' + id}
          ref={ref}
          className={isEnabled ? 'check-item-enabled' : 'check-item-disabled'}
          tabIndex={isEnabled ? -1 : undefined}
          onKeyDown={onKeyDown}
        >
          <div className="verif-item-desc">{description}</div>
          <ButtonToggle disabled={!isEnabled} onValueChange={updateValue} value={value} />
        </li>
      </Fragment>
    );
  },
);

VerificationCheckItem.propTypes = {
  onAnswer: PropTypes.func.isRequired,
  isEnabled: PropTypes.bool.isRequired,
  checkItem: PropTypes.shape({
    id: PropTypes.string.isRequired,
    priority: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default VerificationCheckItem;
