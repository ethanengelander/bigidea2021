
import './App.css';

//import Counter from './components/Counter/counter'

import HangmanGame from './components/Hangman/hangman';

//import ImageSelector from './components/ImageSelector/imageSelector';
//import first from './components/ImageSelector/Images/happy.png'
//import second from './components/ImageSelector/Images/neutral.jpeg'
//import third from './components/ImageSelector/Images/sad.png'
//npx create-react-app <NameOfApp>

//<Counter />
//<HangmanGame guessWord = 'Tiger'/>
//<ImageSelector imageOne = {first} imageTwo = {second} imageThree = {third} />

function App() {
  return (
    <div className="App">
      <HangmanGame guessWord = 'Tiger'/>

    </div>
  );
}

export default App;
