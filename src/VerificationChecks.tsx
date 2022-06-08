import React, { useEffect, useState } from 'react';
import { CheckListItem } from './models/check-list-item';
import { fetchChecks } from './api';
import VerificationCheckItem from './VerificationCheckItem';

export default function VerificationChecks() {
  const [checkList, setCheckList] = useState<CheckListItem[]>([]);

  function sortCheckList(checkListResponse: CheckListItem[]) {
    return checkListResponse.sort((a, b) => b.priority - a.priority);
  }

  function fetchAndDisplayCheckList() {
    fetchChecks()
      .then(checkList => {
        const sortedCheckList = sortCheckList(checkList);
        setCheckList(sortedCheckList);
      })
      .catch(err => {
        throw err;
      });
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

  return (
    <div>
      <ul className="verification-checks-list">
        {checkList.map((c, i) => (
          <VerificationCheckItem
            checkItem={c}
            key={c.id}
            onAnswer={(answer: boolean) => onAnswer(c, i, answer)}
          />
        ))}
      </ul>
    </div>
  );
}
