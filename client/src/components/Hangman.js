import React, { useState, useEffect } from "react";
import LetterButtons from "./LetterButtons";

const initialWord = "";

function Hangman() {
  const [word, setWord] = useState(initialWord);
  const [wordLength, setWordlength] = useState(0);

  useEffect(() => {
    // it only pulls one word from the database
    // SQL: "SELECT word FROM words ORDER BY RANDOM() LIMIT 1"
    fetch("http://localhost:5005/api/words")
      .then((response) => response.json())
      .then((data) => {
        setWord(data[0].word);
      })
      .then(console.log("This is the json const:", word));
  }, []);

  // let tempWord = word;
  // console.log("Tempword=", tempWord);
  // console.log(typeof tempWord);
  // figuring out how to actually have the game function

  let guessedLetters = [];
  // need to update this via LetterButtons component

  console.log("Word =>", word);
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
    console.log(letter);
  }

  return (
    <div>
      <div>{word}</div>
      <br />
      <fieldset>
        <LetterButtons callback={addGuess} />
      </fieldset>
    </div>
  );
}

export default Hangman;
