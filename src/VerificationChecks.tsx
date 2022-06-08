import React, { KeyboardEventHandler, useEffect, useRef, useState } from 'react';
import { CheckListItem } from './models/check-list-item';
import { fetchChecks } from './api';
import VerificationCheckItem from './VerificationCheckItem';

export default function VerificationChecks() {
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
      .catch(err => {
        throw err;
      });
  }

  function isCheckItemEnabled(checkListItem: CheckListItem, index: number) {
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

  return (
    <div>
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
    </div>
  );
}
