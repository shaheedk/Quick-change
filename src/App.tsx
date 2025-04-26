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
      <div className="container">
        <h1 className="title">Quick change</h1>
        <p className="subtitle">Pick a color and apply it to your current tab!</p>

        <div className="preview-box" style={{ backgroundColor: color || '#ffffff' }}>
          <span>{color || 'No Color Selected'}</span>
        </div>

        <div className="card">
          <label htmlFor="colorPicker" className='choose'>Choose a color :</label>
          <input
            id="colorPicker"
            type="color"
            onChange={(e) => setColor(e.target.value)}
          />

          <button onClick={onClickHandler}>
            Apply Background
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
