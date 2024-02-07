import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../src/App.css';
import './Slider.css';

import '../firebaseConfig'; // Add this line prevent firebase not loading error
import { getFirestore, addDoc, doc, setDoc, collection, getDocs } from "firebase/firestore";

// Import your sound file
import meditationSound from './gong.mp3';

function Home() {
  const [value, setValue] = useState(0);

  //initialize database
  const db = getFirestore();

  // Create an Audio object with the sound file
  const [meditationAudio, setMeditationAudio] = useState(null);

  useEffect(() => {
    // Preload the audio file
    const audio = new Audio(meditationSound);
    audio.preload = "auto";
    setMeditationAudio(audio);
  }, []);

  const handleSubmit = async () => {
    try {
      // Add document to database
      const docRef = await setDoc(doc(db, "myCollection", "setStress"), {
        field1: value,
      });
      console.log("Document written to Database");
    } catch (error) {
      console.error("Error writing document:", error);
    }
    
    if (meditationAudio) {
      // Play the sound when the button is clicked
      meditationAudio.play();
    }
    console.log({value});
  };
  

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      <h1 style={{ marginTop: '-150px', marginBottom: '120px'}}>How have you felt since your last meditation?</h1>
        <div className="slider-container">
          <span style = {{ marginRight: '30px', fontSize: '25px'}}>Calm</span>
            <input
              type="range"
              min="0"
              max="100"
              value={value}
              onChange={handleChange}
              className="slider"
            />
          <span style = {{ marginLeft: '30px', fontSize: '25px'}}>Stressed</span>
        </div>
        <div style={{ marginTop: '90px' }}>
          <button onClick={handleSubmit} style={{ fontSize: '25px', padding: '10px 20px', borderRadius: '50px', border: '1px solid #676767' }}>Start Meditation</button>
        </div>
        <div style={{ position: 'absolute', bottom: '20px', right: '20px' }}>
          <Link to="/settings">
            <button style = {{ background: 'transparent', width: '110px'}}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
              </svg>
            </button>
          </Link>
        </div>

    </>
  );
}

export default Home;
