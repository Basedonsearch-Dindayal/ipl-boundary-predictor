import React, { useState } from 'react';
import './index.css';

const teamStats = {
  KKR: { batting: 8, form: 7, impactPlayers: ['Russell', 'Rinku', 'Narine'] },
  LSG: { batting: 8, form: 7, impactPlayers: ['Pooran', 'Stoinis', 'KL Rahul'] },
  MI: { batting: 7, form: 6, impactPlayers: ['Rohit', 'Sky', 'Hardik'] },
  CSK: { batting: 9, form: 8, impactPlayers: ['Ruturaj', 'Dhoni', 'Dube'] },
  RCB: { batting: 8, form: 6, impactPlayers: ['Kohli', 'Faf', 'Maxwell'] },
  RR: { batting: 8, form: 7, impactPlayers: ['Buttler', 'Samson', 'Jaiswal'] },
  DC: { batting: 7, form: 6, impactPlayers: ['Pant', 'Warner', 'Marsh'] },
  PBKS: { batting: 7, form: 5, impactPlayers: ['Livingstone', 'Dhawan', 'Curran'] },
  GT: { batting: 8, form: 7, impactPlayers: ['Gill', 'Rashid', 'Miller'] },
  SRH: { batting: 7, form: 6, impactPlayers: ['Markram', 'Tripathi', 'Klaasen'] }
};

const stadiumStats = {
  'Eden Gardens': { pitch: 9, avgSixes: 15, avgFours: 30 },
  'Wankhede': { pitch: 8, avgSixes: 14, avgFours: 32 },
  'Chepauk': { pitch: 6, avgSixes: 10, avgFours: 25 },
  'Chinnaswamy': { pitch: 10, avgSixes: 20, avgFours: 35 },
  'Narendra Modi Stadium': { pitch: 8, avgSixes: 13, avgFours: 28 }
};

export default function IPLBoundaryPredictor() {
  const [inputs, setInputs] = useState({
    team1: 'KKR',
    team2: 'LSG',
    stadium: 'Eden Gardens',
    tossDecision: 'chase'
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const predict = () => {
    const team1Stats = teamStats[inputs.team1];
    const team2Stats = teamStats[inputs.team2];
    const stadium = stadiumStats[inputs.stadium];

    const base_sixes = stadium.avgSixes;
    const base_fours = stadium.avgFours;

    const team1_score = team1Stats.batting * 0.6 + team1Stats.form * 0.4;
    const team2_score = team2Stats.batting * 0.6 + team2Stats.form * 0.4;

    const pitch_factor = stadium.pitch / 10;
    const chasing_bonus = inputs.tossDecision === 'chase' ? 1.05 : 1.0;

    const predicted_sixes = base_sixes * (team1_score + team2_score) / 20 * pitch_factor * chasing_bonus;
    const predicted_fours = base_fours * (team1_score + team2_score) / 20 * pitch_factor * chasing_bonus;

    setResult({
      sixes: Math.round(predicted_sixes),
      fours: Math.round(predicted_fours),
      team1Impact: team1Stats.impactPlayers,
      team2Impact: team2Stats.impactPlayers
    });
  };

  return (
    <div className="container">
      <h1>IPL Boundary Predictor</h1>
      <div className="card">
        <label>Team 1</label>
        <select name="team1" value={inputs.team1} onChange={handleChange}>
          {Object.keys(teamStats).map(team => (
            <option key={team} value={team}>{team}</option>
          ))}
        </select>

        <label>Team 2</label>
        <select name="team2" value={inputs.team2} onChange={handleChange}>
          {Object.keys(teamStats).map(team => (
            <option key={team} value={team}>{team}</option>
          ))}
        </select>

        <label>Stadium</label>
        <select name="stadium" value={inputs.stadium} onChange={handleChange}>
          {Object.keys(stadiumStats).map(stadium => (
            <option key={stadium} value={stadium}>{stadium}</option>
          ))}
        </select>

        <label>Toss Decision</label>
        <select name="tossDecision" value={inputs.tossDecision} onChange={handleChange}>
          <option value="chase">Chase</option>
          <option value="bat">Bat</option>
        </select>

        <button onClick={predict}>Predict Boundaries</button>
      </div>

      {result && (
        <div className="result">
          <p>🔮 Predicted Sixes: {result.sixes}</p>
          <p>🔮 Predicted Fours: {result.fours}</p>
          <p>🔥 {inputs.team1} Key Players: {result.team1Impact.join(', ')}</p>
          <p>🔥 {inputs.team2} Key Players: {result.team2Impact.join(', ')}</p>
        </div>
      )}
    </div>
  );
}