import React, { Fragment, useState } from 'react';
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

    function updateValue(newValue: boolean) {
      setValue(newValue);
      onAnswer(newValue);
    }
    return (
      <Fragment>
        <li id={'verification-check-item-' + id} ref={ref}>
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
