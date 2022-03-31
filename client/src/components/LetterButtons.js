

const LetterButtons = () => {
  let letters = "abcdefghijklmnopqrstuvwxyz";
  let splitLetters = letters.toUpperCase().split("");


  //Listing Letters
  return (
    <div>
    {splitLetters.map((letter) => (
        <button 
          className="letter-buttons"
          key={letter}
          value={letter}
          >
            <b>{letter}</b>
        </button>
        ))
      }    
    </div>
  )
};

export default LetterButtons;