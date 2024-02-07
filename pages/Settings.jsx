import React from 'react'
import { Link } from 'react-router-dom';


const Settings = () => {
  return (
    <>
      <div >
        <h2 style={{ marginBottom: '120px', textAlign: 'center', fontSize: '34px', lineHeight: '3' }}>
          <div>Step 1: Wear the Fitbit to collect heart rate data.</div>
          <div>Step 2: Refresh the Fitbit app to upload the data.</div>
          <div>Step 3: Set your stress level and click submit.</div>
          <div>Step 4: Start meditating.</div>
        </h2>
        <div style={{ position: 'absolute', bottom: '20px', right: '20px' }}>
          <Link to="/">
            <button style={{ background: 'transparent', width: '110px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Settings