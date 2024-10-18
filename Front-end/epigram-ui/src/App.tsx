import React from 'react';
import './App.css';
import RandomEpigram from './components/RandomEpigram';
import AddEpigram from './components/AddEpigram';
import logo from './components/logo.png';

const App: React.FC = () => {
  return (

    <div className="App" style={{ padding: "20px" }}>
      <div style={{ width: '100%', backgroundColor: 'black', display: 'flex', justifyContent: 'center' }}>
        <img
          src={logo}
          alt="Epigram logo"
          style={{ width: '23%', height: '10%', maxWidth: '100%' }}
        />
      </div>
      <div>

        <div style={{ textAlign: "center", flex: 1 }}>
          <h1 style={{ color: "black", fontSize: "36px", fontFamily: "'Times New Roman', Times, serif", marginTop: "1" }}>
            Welcome to Epicgram
          </h1>
          <p style={{ display: 'inline', color: "black", fontSize: "22px", fontFamily: "'Times New Roman', Times, serif", marginTop: "5px", marginBottom: "0" }}>
            An epigram is a{' '}
          </p>
          <p style={{ display: 'inline', color: "#8B1E4D", fontSize: "22px", fontFamily: "'Times New Roman', Times, serif", marginTop: "5px", marginBottom: "0" }}>
            "pithy saying or remark expressing an idea in a clever and amusing way."
          </p>
        </div>
        <div style={{ width: "250px" }}></div>
      </div>
      <div style={{ marginTop: "-10px" }}>
        <RandomEpigram />
      </div>
      <AddEpigram />
    </div>
  );
};

export default App;
