import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../src/App.css';
import './Slider.css';

function Home() {
  const [stressLevel, setStressLevel] = useState(2);
  const [value, setValue] = useState(0);

  const stressLevels = ["very stressed", "stressed", "neutral", "calm", "very calm"];

  const handleSubmit = () => {
    console.log({value});
  };  

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  // Define grid style
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(20, 1fr)',
    gridGap: '10px',
    marginBottom: '20px',
  };
  
  // Generate grid squares
  const gridSquares = Array.from({ length: 100 }, (_, index) => (
    <div key={index} style={{ width: '20px', height: '20px', border: '1px solid black', backgroundColor: index % 16 && index % 7 || index === 98 || index === 96 ? 'green' : 'transparent' }}></div>
  ));

  return (
    <>
      <h1>Balance</h1>
      <div className="card">
        <div>
          <div className='inliner'>
            {/* <p>Last pressed: {stressLevels[stressLevel]}</p> */}
          </div>
          <div className="slider-container">
            <span style = {{ marginRight: '5px'}}>Calm</span>
            <input
              type="range"
              min="0"
              max="100"
              value={value}
              onChange={handleChange}
              className="slider"
            />
            <span style = {{ marginLeft: '5px'}}>Stressed</span>
          </div>
          <div style={{ display: 'flex', gap: '50px', alignItems: 'center', justifyContent: 'center', marginTop: '50px', marginBottom: '30px'}}>
            <button onClick={handleSubmit}>Submit</button>
            <Link to="/settings">
                <button className='settingsButton'>Settings</button>
            </Link>
          </div>
        </div>
      </div>
      <h2 style={{ marginTop: '20px' }}>last 100 days</h2>
      {/* Display grid */}
      <div style={gridStyle}>{gridSquares}</div>
    </>
  );
}

export default Home;
