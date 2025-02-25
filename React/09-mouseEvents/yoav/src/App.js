import logo from './logo.svg';
import './App.css';
import React, { useEffect, useRef, useState } from 'react';
import Land from './words/land.mp3'
import Sea from './words/sea.mp3'
import { db } from './functions/firebase/config';
import { doc, addDoc, collection, setDoc, query, where, getDocs, onSnapshot } from 'firebase/firestore'
let seaOrLandRef = doc(db, 'YB', 'seaOrLand');

function App() {
  const circle = useRef(null);
  console.dir(circle);
  const seaSound = new Audio(Sea);
  const landSound = new Audio(Land);
  let instruction;
  let playerName;
  let userChoice = true;

  let gameRef = doc(db, 'YB', 'seaOrLand');
  useEffect(() => {
    const unsubscribe = onSnapshot(seaOrLandRef, (seaOrLandDB) => {
      console.log(seaOrLandDB.data())
    });
    return () => {
      unsubscribe();
    }
  }, [])

  setDoc(gameRef, { start: false });


  const [display, setDisplay] = useState('inline');

  async function numPlayersLeft() {
    const q = query(collection(db, 'YB', 'Players', 'playerList'));

    const querySnapshot = await getDocs(q);

    let playersLeft = 0;
    let onePlayerLeft = false;
    let gameOver = false;

    querySnapshot.forEach((doc) => {
      let data = doc.data();
      if (data.userChoice == true) {
        playersLeft++;
      }
    })

    if (playersLeft < 1) {
      console.log("game over");
    }

    else if (playersLeft == 1) {
      console.log("Last remaining")
    }

    else if (playersLeft > 1) {
      console.log("Players Left = " + playersLeft);
    }

  }


  function seaOrLand() {
    if ((Math.floor(Math.random() * 2) + 1) == 1) {
      seaSound.play()
      instruction = 'sea';
      setDoc(seaOrLandRef, { Answer: instruction, start: true });
    }
    else {
      landSound.play()
      instruction = 'land';
      setDoc(seaOrLandRef, { Answer: instruction, start: true });
    }
  }

  function checkAnswer(id) {
    let userAnswerRef = doc(db, 'YB', 'Players', 'playerList', playerName);

    if (id == instruction) {
      setDoc(userAnswerRef, { userAnswer: id, userChoice: true });
      numPlayersLeft();
      console.log('true')
      return (true)
    }
    else {
      setDoc(userAnswerRef, { userAnswer: id, userChoice: false });
      setDisplay('none');
      alert('You lost');
      numPlayersLeft();
      return (false)
    }




  }



  function handleClick(ev) {
    console.log(ev)
    console.log(ev.target.id)
    const x = ev.clientX;
    const y = ev.clientY;
    circle.current.style.top = `${y - 50}px`;
    circle.current.style.left = `${x - 50}px`;
    if (checkAnswer(ev.target.id) == true) {
      setTimeout(function () { seaOrLand() }, 1000)
    }
  }
  function handleStart() {
    setDoc(gameRef, { start: true })
    setTimeout(function () { seaOrLand() }, 1000)
  }

  function handleName(event) {
    event.preventDefault();

    playerName = event.target.elements.nameBox.value;
    const nameRef = doc(db, 'YB', 'Players', 'playerList', playerName);
    console.log(playerName)
    if (playerName.length > 0) {
      setDoc(nameRef, { name: playerName, userChoice: true })

    }



  }






  return (
    <div className="App">
      <div className="Container" style={{ display: display }}>

        <div id="sea" className='box blue' onClick={handleClick}></div>
        <div id="land" className='box brown' onClick={handleClick}></div>
        <div ref={circle} className='circle'></div>
        <form onSubmit={handleName}>
          <input type='text' placeholder='name' name='nameBox' />
          <input type='submit' value='submit' />

        </form>
        <input type='button' value='start' onClick={handleStart} />
      </div>
    </div>
  );
}

export default App;
