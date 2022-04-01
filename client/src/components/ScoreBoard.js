import {useState, useEffect} from 'react';

const ScoreBoard = () => {
  const [highscores, setHighscores] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5005/api/winners")
      .then((response) => response.json())
      .then((winners) => {
        setHighscores(winners);
      });
  }, []);

  //Listing Letters
  return (
    <div className="scoreboard">
      <ol className="scoreboardlist">
        <h3>Top 5 Highscores</h3>
        {highscores.map((highscore) => (
          <li key={highscore.id}>
            {highscore.name}, Score: {highscore.score}
            <hr/>
          </li>
          
        ))}
      </ol>
    </div>
  );
};

export default ScoreBoard;
