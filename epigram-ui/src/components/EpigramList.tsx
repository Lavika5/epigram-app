import axios from 'axios';
import { useEffect, useState } from 'react';
import { Epigram } from '../models/Epigram';

const EpigramList = () => {
  const [epigrams, addEpigrams] = useState<Epigram[]>([]);
  const [error, addError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get('https://localhost:8443/epigrams')
      .then(response => {
        addEpigrams(response.data);
        addError(null);
      })
      .catch(error => {
        console.error('Error loading epigrams:', error);
        addError('Failed to find epigrams. Please try again.');
      });
  }, []);

  return (
    <div>
      <h1 style={{ color: "white", fontSize: "24px", textAlign: "center" }}>Epigrams</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {epigrams.map(epigram => (
          <li key={epigram.epigram_id}>
            {epigram.epigram_text} - {epigram.epigram_dateAdded}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EpigramList;
