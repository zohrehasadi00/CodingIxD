import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../src/App.css';

function Home() {
  const [stressLevel, setStressLevel] = useState(2);

  const stressLevels = ["very stressed", "stressed", "neutral", "calm", "very calm"];

  const handleButtonClick = (level) => {
    setStressLevel(level);
  };

  const redirectToSettings = () => {
    // Redirect to the settings page
    window.location.href = '/settings';
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
        <div>
            <div className='inliner'>
            <p>Last pressed: {stressLevels[stressLevel]}</p>
            </div>
            {/* Add a Link component for the settings button */}
            <div className='inliner settings'>
                <Link to="/settings">
                    <button className='settingsButton'>Settings</button>
                </Link>
            </div>
        </div>
      </div>
    </>
  );
}

export default Home;
