import React from 'react'
import { Link } from 'react-router-dom';


const Settings = () => {
  return (
    <>
        <div>Settings</div>
        <Link to="/">
            <button>Go to Home</button>
        </Link>
    </>
  )
}

export default Settings