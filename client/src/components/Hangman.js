import React, { useState, useEffect } from "react";
import LetterButtons from "./LetterButtons";

const initialWord = "";

const letters = "abcdefghijklmnopqrstuvwxyz";
const splitLetters = letters.toUpperCase().split("");

const initialGuesses = splitLetters.reduce((result, value) => {
  return { ...result, [value]: { guess: false, correct: null } };
}, {});

const maxIncorrectGuess = 6;

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

  // let tempWord = word;
  // console.log("Tempword=", tempWord);
  // console.log(typeof tempWord);
  // figuring out how to actually have the game function

  // need to update this via LetterButtons component

  console.log("Word =>", word);
  console.log("Guessed array:", guessed);
  // console.log("Word.length =>", word.word.length);

  // function to compare guessedLetters to {word.word}
  // function updateWord(tempWord) {

  //   for (let i = 0; i < tempWord.length; i++) {
  //     console.log("yo");
  //   }

  //   //Updates wordState to reflect correct guesses
  // }

  // updateWord();

  function addGuess(letter) {
    setGuessed((guessed) => {
      return {
        ...guessed,
        [letter]: { guess: true, correct: checkGuess(word, letter) },
      };
    });
    console.log(letter);
  }

  //reset button
  function handleResetClick() {
    setGuessed(initialGuesses);
    fetchWord();
  }

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

  return (
    <div>
      <div>{makeDisplayString(word, guessed)}</div>
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
        <button onClick={handleResetClick}>Reset</button>
      </fieldset>
    </div>
  );
}

export default Hangman;
