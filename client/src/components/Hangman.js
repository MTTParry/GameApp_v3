import React, { useState, useEffect } from "react";
import LetterButtons from "./LetterButtons";

const initialWord = "";

const letters = "abcdefghijklmnopqrstuvwxyz";
const splitLetters = letters.toUpperCase().split("");

const initialGuesses = splitLetters.reduce((result, value) => {
  return { ...result, [value]: false };
}, {});

function makeDisplayString(theWord, guesses) {
  return theWord
    .toUpperCase()
    .split("")
    .map((char) => {
      if (guesses[char]) {
        return char;
      } else {
        return " _ ";
      }
    });
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
      return { ...guessed, [letter]: true };
    });
    console.log(letter);
  }

  //reset button
  function handleResetClick() {
    setGuessed(initialGuesses);
    fetchWord();
  }

  return (
    <div>
      <div>{makeDisplayString(word, guessed)}</div>
      <br />
      <fieldset>
        <form>
          {Object.keys(guessed).map((letter) => {
            return (
              <LetterButtons
                callback={addGuess}
                letter={letter}
                guessed={guessed[letter]}
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
