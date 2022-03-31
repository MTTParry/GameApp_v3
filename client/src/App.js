import "./App.css";
import Hangman from "./components/Hangman";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <Hangman />
    </div>
  );
}

export default App;
