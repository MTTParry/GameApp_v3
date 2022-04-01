const LetterButtons = (props) => {
  const letter = props.letter;
  const guessed = props.guessed;
  // button onClick=> add to guessedLetters Array and send that back up to the parent
  // guessed letters will be used to identify letters that are in the word
  // if guessedLetter does not match a letter in the array:
  // non-matching letters replaced with " _ "
  // remainingGuesses--
  // if remainingGuesses === 0
  // player loses

  const handleButtonClick = (e) => {
    if (!props.callback) {
      console.log("You didn't pass in a function");
      return;
    }
    console.log(e.target.value);
    props.callback(e.target.value);
  };

  let className = "letter-buttons";
  if (props.correct === true) {
    className += " correct";
  } else if (props.correct === false) {
    className += " incorrect";
  }

  //Listing Letters
  return (
    <input
      type="button"
      className={className}
      key={letter}
      value={letter}
      disabled={guessed}
      onClick={handleButtonClick}
    />
  );
};

export default LetterButtons;
