import React, { useState, useEffect } from "react";
import LetterButtons from "./LetterButtons";
import ScoreBoard from "./ScoreBoard";

const initialWord = "";

const letters = "abcdefghijklmnopqrstuvwxyz";
const splitLetters = letters.toUpperCase().split("");

const initialGuesses = splitLetters.reduce((result, value) => {
  return { ...result, [value]: { guess: false, correct: null } };
}, {});

const maxIncorrectGuess = 6;

const initialScore = 0;

function makeDisplayString(theWord, guesses) {
  return theWord
    .toUpperCase()
    .split("")
    .map((char) => {
      if (guesses[char].guess) {
        return char;
      } else {
        return " _ ";
      }
    });
}

function checkGuess(theWord, guess) {
  return theWord.toUpperCase().includes(guess);
}

// reduces array into a sum
// will return # of incorrect guesses
function countIncorrectGuess(guesses) {
  return Object.keys(guesses).reduce((count, letter) => {
    const guess = guesses[letter];
    return count + (guess.correct === false ? 1 : 0);
  }, 0);
}

function Hangman() {
  const [word, setWord] = useState(initialWord);
  const [guessed, setGuessed] = useState(initialGuesses);
  const [score, setScore] = useState(initialScore);

  console.log(initialGuesses);

  const fetchWord = () => {
    // it only pulls one word from the database
    // SQL: "SELECT word FROM words ORDER BY RANDOM() LIMIT 1"
    fetch("http://localhost:5005/api/words")
      .then((response) => response.json())
      .then((data) => {
        setWord(data[0].word);
      })
      .then(console.log("This is the json const:", word));
  };

  useEffect(fetchWord, []);

  console.log("Word =>", word);
  console.log("Guessed array:", guessed);
  // console.log("Word.length =>", word.word.length);

  // takes in guess and sets them to true (they can't be guessed again)
  // checks for correctness
  function addGuess(letter) {
    setGuessed((guessed) => {
      return {
        ...guessed,
        [letter]: { guess: true, correct: checkGuess(word, letter) },
      };
    });
    console.log(letter);
    scoreCalculator();
  }

  //reset button
  function handleResetClick() {
    setGuessed(initialGuesses);
    fetchWord();
  }

  // lose condition
  let incorrect = countIncorrectGuess(guessed);
  let guessDiv;
  if (incorrect >= maxIncorrectGuess) {
    guessDiv = <div>You lost!</div>;
  } else {
    guessDiv = (
      <div>
        Incorrect Guesses: {incorrect}/{maxIncorrectGuess}
      </div>
    );
  }

  // win condition

  // score
  // -5 for each wrong guess
  // if (incorrect > 0) {
  //   setScore(score - (5));
  // }
  // +5 for each correct letter
  let tempStr = makeDisplayString(word, guessed);
  function scoreCalculator() {
    for (let i = 0; i < tempStr.length; i++) {
      if (tempStr[i] !== " _ ") {
        setScore(score + 5);
      }
    }
    return score;
  }

  // display high scores

  return (
    <div>
      <div className="gameDisplay">{makeDisplayString(word, guessed)}</div>
      <br />
      Current score: {score}
      <br />
      {guessDiv}
      <br />
      <fieldset>
        <form>
          {Object.keys(guessed).map((letter) => {
            return (
              <LetterButtons
                callback={addGuess}
                letter={letter}
                guessed={guessed[letter].guess}
                correct={guessed[letter].correct}
              />
            );
          })}
        </form>
        <br />
        <button className="reset-btn" onClick={handleResetClick}>
          Reset
        </button>
      </fieldset>
      <ScoreBoard />
    </div>
  );
}

export default Hangman;
