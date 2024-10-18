import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RandomEpigram: React.FC = () => {
  const [epigram, setEpigram] = useState<{ text: string; source?: string; dateAdded?: string } | null>(null);
  const [previousEpigram, setPreviousEpigram] = useState<{ text: string; source?: string; dateAdded?: string } | null>(null); // Store previous epigram
  const [autoReload, setAutoReload] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [currentTime, setCurrentTime] = useState<string>(new Date().toLocaleTimeString());

  const getRandomEpigram = () => {
    axios.get('https://localhost:8443/epigrams/random')
      .then(response => {
        const newEpigram = response.data;
        setPreviousEpigram(newEpigram);
        if (!previousEpigram || newEpigram.text !== previousEpigram.text) {
          setEpigram(newEpigram);
        } else {
          console.log('Duplicate found, trying again');
          getRandomEpigram();
        }
      })
      .catch(error => console.error('Error getting random epigram:', error));
  };


  useEffect(() => {
    const clockInterval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(clockInterval);
  }, []);


  useEffect(() => {
    getRandomEpigram();
  }, []);


  const toggleAutoReload = () => {
    setAutoReload(prevState => !prevState);
  };


  useEffect(() => {
    if (autoReload && !intervalId) {
      const id = setInterval(() => {
        getRandomEpigram();
      }, 5000);
      setIntervalId(id);
    } else if (!autoReload && intervalId) {

      clearInterval(intervalId);
      setIntervalId(null);
    }


    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [autoReload, intervalId]);


  const manualReloadHandler = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    getRandomEpigram();
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div>
        <h2 style={{ fontSize: '20px', marginBottom: '5px' }}>Current Time: {currentTime}</h2>
      </div>
      {epigram ? (
        <div>
          <p style={{ fontSize: '26px', marginTop: '5px' }}>
            <strong>Epigram:</strong> <span style={{ color: "#8B1E4D" }}>"{epigram.text}"</span>
          </p>
          {epigram.source && <p><strong>Source:</strong> <span style={{ color: "#8B1E4D" }}>- {epigram.source}</span></p>}
          {epigram.dateAdded && <p><strong>Date Added:</strong><span style={{ color: "#8B1E4D" }}>{epigram.dateAdded}</span></p>}
        </div>
      ) : (
        <p>Epigram loading...</p>
      )}

      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '10px' }}>
        <button onClick={manualReloadHandler}>Load Another Epigram</button>
        <button onClick={toggleAutoReload}>
          {autoReload ? 'Disable Auto-Reload' : 'Enable Auto-Reload'}
        </button>
      </div>
    </div>
  );
};

export default RandomEpigram;
