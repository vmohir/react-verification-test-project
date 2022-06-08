import React, { KeyboardEventHandler, useEffect, useRef, useState } from 'react';
import { CheckListItem } from './models/check-list-item';
import { fetchChecks, submitCheckResults } from './api';
import './VerificationChecks.scss';
import VerificationCheckItem from './VerificationCheckItem';
import Button from './Button';

interface Props {
  onSuccess: () => void;
  onError: () => void;
}

export const VerificationChecks: React.FC<Props> = ({ onSuccess, onError }) => {
  const [checkList, setCheckList] = useState<CheckListItem[]>([]);

  const checkItemsRef = useRef<Array<HTMLLIElement | null>>([]);

  function sortCheckList(checkListResponse: CheckListItem[]) {
    return checkListResponse.sort((a, b) => b.priority - a.priority);
  }

  function fetchAndDisplayCheckList() {
    fetchChecks()
      .then(checkList => {
        const sortedCheckList = sortCheckList(checkList);
        setCheckList(sortedCheckList);
        checkItemsRef.current = checkItemsRef.current.slice(0, sortedCheckList.length);
      })
      .catch(error => {
        console.error("Couldn't fetch data", error);
        if (error.success === false) {
          onError();
          return;
        }

        throw error; // Unknown error
      });
  }

  function isCheckItemEnabled(
    checkListItem: CheckListItem,
    index: number,
  ): checkListItem is Required<CheckListItem> {
    return checkList.every((c, i) => i >= index || c.value === 'Yes');
  }

  useEffect(() => {
    fetchAndDisplayCheckList();
  }, []);

  function onAnswer(checkListItem: CheckListItem, index: number, answer: boolean) {
    const newCheckList = checkList.map((c, i) => {
      if (i === index) {
        return { ...c, value: (answer ? 'Yes' : 'No') as CheckListItem['value'] };
      }
      return c;
    });
    setCheckList(newCheckList);
  }

  const onKeyDown: KeyboardEventHandler = event => {
    if (!['ArrowDown', 'ArrowUp'].includes(event.key)) return;

    const currentFocusedItemIndex = checkItemsRef.current.findIndex(li =>
      li?.contains(event.target as Node),
    );
    if (currentFocusedItemIndex === -1) {
      checkItemsRef.current[0]?.focus();
    }
    switch (event.key) {
      case 'ArrowDown':
        checkItemsRef.current[currentFocusedItemIndex + 1]?.focus();
        break;
      case 'ArrowUp':
        checkItemsRef.current[currentFocusedItemIndex - 1]?.focus();
        break;
    }
  };

  function onSubmit() {
    if (isSubmitButtonDisabled()) return;

    submitCheckResults(
      checkList
        .filter((c, i) => isCheckItemEnabled(c, i) && c.value != undefined)
        .map(c => ({
          checkId: c.id,
          result: c.value!, // c.value is checked in the filter
        })),
    )
      .then(() => onSuccess())
      .catch(error => {
        console.error("Couldn't submit data", error);
        if (error.success === false) {
          onError();
          return;
        }

        throw error; // Unknown error
      });
  }

  function isSubmitButtonDisabled(): boolean {
    return (
      checkList.reduce<boolean | undefined>((res, c) => {
        if (res != undefined) return res;
        return c.value === 'Yes' ? undefined : c.value === 'No';
      }, undefined) === false
    );
  }

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <ul className="verification-checks-list" tabIndex={-1} onKeyDown={onKeyDown}>
        {checkList.map((c, i) => (
          <VerificationCheckItem
            checkItem={c}
            key={c.id}
            ref={el => (checkItemsRef.current[i] = el)}
            isEnabled={isCheckItemEnabled(c, i)}
            onAnswer={(answer: boolean) => onAnswer(c, i, answer)}
          />
        ))}
      </ul>

      <div className="d-flex justify-content-end">
        <Button type="submit" disabled={isSubmitButtonDisabled()}>
          SUBMIT
        </Button>
      </div>
    </form>
  );
};

export default VerificationChecks;
