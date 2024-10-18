import axios from 'axios';
import { useState } from 'react';

const AddEpigram = () => {
  const [text, addText] = useState('');
  const [source, addSource] = useState('');

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    axios
      .post('https://localhost:8443/epigrams', { text, source }, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(() => {
        alert('Epigram has been added!');
        addText('');
        addSource('');
      })
      .catch(error => {
        console.error('Error adding epigram:', error);
      });
  };

  return (
    <form onSubmit={submitHandler

    }>
      <h2>Contribute an Epigram</h2>
      <input
        type="text"
        value={text}
        onChange={(e) => addText(e.target.value)}
        placeholder="Enter epigram"
        required
      />
      <input
        type="text"
        value={source}
        onChange={(e) => addSource(e.target.value)}
        placeholder="Enter the source of the epigram(Optional)"
      />
      <button type="submit">Add Epigram</button>
    </form>
  );
};

export default AddEpigram;
