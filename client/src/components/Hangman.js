import React, { useState, useEffect } from "react";
import LetterButtons from "./LetterButtons";

function Hangman() {
  const [word, setWord] = useState([]);
  const [wordLength, setWordlength] = useState(0);

  useEffect(() => {
    // it only pulls one word from the database
    // SQL: "SELECT word FROM words ORDER BY RANDOM() LIMIT 1"
    fetch("http://localhost:5005/api/words")
      .then((response) => response.json())
      .then((word) => {
        setWord(word[0]);
      })
      .then(console.log("This is the json const:", word));
  }, []);

  let tempWord = word.word;
  console.log("Tempword=", tempWord);
  console.log(typeof tempWord);
  // figuring out how to actually have the game function
  let guessedLetters = [];
  // need to update this via LetterButtons component

  console.log("Word =>", word.word);
  // console.log("Word.length =>", word.word.length);

  // function to compare guessedLetters to {word.word}
  // function updateWord(tempWord) {

  //   for (let i = 0; i < tempWord.length; i++) {
  //     console.log("yo");
  //   }

  //   //Updates wordState to reflect correct guesses
  // }

  // updateWord();

  return (
    <div>
      <div>{word.word}</div>
      <br />
      <fieldset>
        <LetterButtons />
      </fieldset>
    </div>
  );
}

export default Hangman;
