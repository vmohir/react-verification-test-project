import React, { Fragment } from 'react';
import { CheckListItem } from './models/check-list-item';
import PropTypes from 'prop-types';

interface Props {
  checkItem: CheckListItem;
}

const VerificationCheckItem = React.forwardRef<HTMLLIElement, Props>(
  ({ checkItem: { id, description } }, ref) => {
    return (
      <Fragment>
        <li id={'verification-check-item-' + id} ref={ref}>
          <div className="verif-item-desc">{description}</div>
        </li>
      </Fragment>
    );
  },
);

VerificationCheckItem.propTypes = {
  checkItem: PropTypes.shape({
    id: PropTypes.string.isRequired,
    priority: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default VerificationCheckItem;
