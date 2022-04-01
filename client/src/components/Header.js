import React from 'react';

const Header = () => {
  return (
    <div>
      <h1>Dunk-Person</h1>
      <hr/>
      <ul className="rules">
        <h2>Figure out the word </h2>
        <li>Click a letter to guess it</li>
        <li>Up to 5 incorrect guess</li>
        <li>6 incorrect means you lose!</li>
        <li>Each incorrect guess is -5 points</li>
        <li>Each correct guess is +5 points, per instance
          <br/>
          <i>example: 'L' for hello would get 10 points</i>
        </li>
      </ul>
      <hr/>
    </div>
  )
}

export default Header;