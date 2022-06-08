import React, { Fragment, KeyboardEventHandler, useState } from 'react';
import { CheckListItem } from './models/check-list-item';
import ButtonToggle from './ButtonToggle';
import PropTypes from 'prop-types';

interface Props {
  checkItem: CheckListItem;
  onAnswer: (answer: boolean) => void;
}

const VerificationCheckItem = React.forwardRef<HTMLLIElement, Props>(
  ({ checkItem: { id, description }, onAnswer }, ref) => {
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
        <li id={'verification-check-item-' + id} ref={ref} tabIndex={-1} onKeyDown={onKeyDown}>
          <div className="verif-item-desc">{description}</div>
          <ButtonToggle onValueChange={updateValue} value={value} />
        </li>
      </Fragment>
    );
  },
);

VerificationCheckItem.propTypes = {
  onAnswer: PropTypes.func.isRequired,
  checkItem: PropTypes.shape({
    id: PropTypes.string.isRequired,
    priority: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default VerificationCheckItem;
