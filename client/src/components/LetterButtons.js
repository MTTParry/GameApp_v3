const LetterButtons = (props) => {
  let letters = "abcdefghijklmnopqrstuvwxyz";
  let splitLetters = letters.toUpperCase().split("");

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
    console.log(e);
    props.callback(e);
  };

  //Listing Letters
  return (
    <div>
      {splitLetters.map((letter) => (
        <button
          className="letter-buttons"
          key={letter}
          value={letter}
          onClick={(e) => {
            handleButtonClick(letter);
          }}
        >
          <b>{letter}</b>
        </button>
      ))}
    </div>
  );
};

export default LetterButtons;
