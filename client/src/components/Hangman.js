import React, { useState, useEffect } from "react";
import LetterButtons from "./LetterButtons";

function Hangman() {
  const [word, setWord] = useState([]);

  useEffect(() => {
    // it's called 'animal' but it's species
    fetch("http://localhost:5005/api/words")
      .then((response) => response.json())
      .then((word) => {
        //setStudents((students[3]));
        //console.log("Testing", typeof students);
        setWord(word[0].word);
      });
  }, []);

  console.log(word);

  return (
    <div>
      <h1>Dunk-Person</h1>
      <div>{word}</div>
      <br/>
      <fieldset>
        <LetterButtons />
      </fieldset>
    </div>
  );
}

export default Hangman;
