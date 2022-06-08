import React, { useState } from 'react';
import './styles.css';
import VerificationChecks from './VerificationChecks';
import StatusScreen from './StatusScreen';

export default function App() {
  const [screenMode, setScreenMode] = useState<'check-list' | 'success' | 'error'>('check-list');

  function displaySuccessScreen() {
    setScreenMode('success');
  }

  function displayErrorScreen() {
    setScreenMode('error');
  }

  function goBackToCheckListScreen() {
    setScreenMode('check-list');
  }

  return (
    <div className="App container">
      {screenMode === 'check-list' ? (
        <VerificationChecks onSuccess={displaySuccessScreen} onError={displayErrorScreen} />
      ) : (
        <StatusScreen isSuccess={screenMode === 'success'} onTryAgain={goBackToCheckListScreen} />
      )}
    </div>
  );
}
