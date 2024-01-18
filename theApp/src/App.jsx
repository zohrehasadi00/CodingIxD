import { useState } from 'react';
import './App.css';

function App() {
  const [stressLevel, setStressLevel] = useState(2);

  const stressLevels = ["very stressed", "stressed", "neutral", "calm", "very calm"];

  const handleButtonClick = (level) => {
    setStressLevel(level);
  };

  return (
    <>
      <div>
        {/* Add your logo links here */}
      </div>
      <h1>Stress level</h1>
      <div className="card">
        {/* Container div for stacking buttons */}
        <div className="button-container">
          {stressLevels.map((level, index) => (
            <button key={index} onClick={() => handleButtonClick(index)}>
              {level}
            </button>
          ))}
        </div>
        <p>Last pressed: {stressLevels[stressLevel]}</p>
      </div>
    </>
  );
}

export default App;
