import './App.css';
import { useState } from 'react';

function App() {
  const [color, setColor] = useState<string>('');

  const onClickHandler = async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (tab.id !== undefined) {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        args: [color],
        func: (color: string) => {
          document.body.style.backgroundColor = color;
        }
      });
    }
  };

  return (
    <>
      <div className="card">
        <input type="color" onChange={(e) => setColor(e.target.value)} />
        <button onClick={onClickHandler}>
          click me
        </button>
      </div>
    </>
  );
}

export default App;
