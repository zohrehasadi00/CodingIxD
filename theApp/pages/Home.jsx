import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../src/App.css';
import './Slider.css';

function Home() {
  const [stressLevel, setStressLevel] = useState(2);
  const [value, setValue] = useState(0);

  const stressLevels = ["very stressed", "stressed", "neutral", "calm", "very calm"];

  const handleChange = (event) => {
    setValue(event.target.value);
  };

    // Define grid style
    const gridStyle = {
      display: 'grid',
      gridTemplateColumns: 'repeat(10, 1fr)',
      gridGap: '5px',
      marginBottom: '20px',
    };
  
    // Generate grid squares
    const gridSquares = Array.from({ length: 100 }, (_, index) => (
      <div key={index} style={{ width: '20px', height: '20px', border: '1px solid black', backgroundColor: index % 16 && index % 7 || index === 98 || index === 96 ? 'green' : 'transparent' }}></div>
    ));

  return (
    <>
      <div>
        {/* Add your logo links here */}
      </div>
      <h1>Stress level</h1>
      <div className="card">
        <div>
          <div className='inliner'>
            {/* <p>Last pressed: {stressLevels[stressLevel]}</p> */}
          </div>
          <div className="slider-container">
            <span>Calm</span>
            <input
              type="range"
              min="0"
              max="100"
              value={value}
              onChange={handleChange}
              className="slider"
            />
            <span>Stressed</span>
          </div>
          {/* Add a Link component for the settings button */}
          <div className='inliner settings'>
            <Link to="/settings">
              <button className='settingsButton'>Settings</button>
            </Link>
          </div>
        </div>
      </div>
      <h2 style={{ marginTop: '50px' }}>last 100 days</h2>
      {/* Display grid */}
      <div style={gridStyle}>{gridSquares}</div>
    </>
  );
}

export default Home;
