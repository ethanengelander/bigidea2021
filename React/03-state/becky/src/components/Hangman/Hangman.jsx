import React, { useState } from 'react';
import './Hangman.css';

let word;
let guessCount = 6;
let dashes = [];
let wordarr = [];


function Hangman() {
    const [text, setText] = useState();
    const [color, setColor] = useState('red');
    const [showDom, setShowDom] = useState('block')
    const [guessWordArray, setGuessWordArray] = useState([])
    const [hideBody, setHideBody] = useState(1)
    let userInput;


    function handleSubmit(ev) {
        ev.preventDefault();
        word = ev.target.elements.secretWord.value
        wordarr = word.split("");
        console.log(word);
        // ev.target.style.display = "none";
        setShowDom('none')
        // word.setShowDom()
        for (let i = 0; i < wordarr.length; i++) {
            guessWordArray.push(wordarr[i]);
            dashes[i] = '[]'
        }
        console.log(guessWordArray);
        console.log(dashes);



    }

    function handleWriting(ev) {
        setText(ev.target.value)
        const lastChar = ev.target.value.slice(-1)

        if (word.includes(lastChar)) {
            console.log('YES');
            setColor('green');
            for (let x = 0; x <= wordarr.length; x++) {
                if (lastChar == wordarr[x]) {
                    dashes[x] = lastChar;
                }
                for (let k = 0; k <= wordarr.length; k++) {
                    if (wordarr[k] == 1) {
                        //show corresponding body part
                    }
                }
            }
        }




        else { // incorrect
            setColor('red');
            guessCount -= 1;
            console.log(`You have ${guessCount} guesses left.`);
        }
    }

    switch (guessCount) {
        case 6:
            console.log("6")
            return (<div>
                <div className='hangman'></div>
                <form onSubmit={handleSubmit} id='container' style={{ display: showDom }}>
                    <input type="password" name="secretWord" id="form" />
                    <input type="submit" value='hide' />


                </form>
                <div className='box' style={{ background: color }}></div>
                Type your guess:
                <input type='text' maxLength="1"
                    placeholder='Input guess here'
                    onKeyUp={handleWriting} />

                <div
                    className='textContainer'
                    id='textbox'
                />
                {text}
                <div className="wrapper">
                    {dashes.map((letter, index) => {
                        return (<div key={index}>{letter}</div>)
                    }
                    )}



                </div>

            </div>)
        case 5:
            console.log("5");
            return (<div>
                <div className='hangman'></div>
                <form onSubmit={handleSubmit} id='container' style={{ display: showDom }}>
                    <input type="password" name="secretWord" id="form" />
                    <input type="submit" value='hide' />


                </form>
                <div className='box' style={{ background: color }}></div>
                Type your guess:
                <input type='text' maxLength="1"
                    placeholder='Input guess here'
                    onKeyUp={handleWriting} />

                <div
                    className='textContainer'
                    id='textbox'
                />
                {text}
                <div className="wrapper">
                    {dashes.map((letter, index) => {
                        return (<div key={index}>{letter}</div>)
                    }
                    )}



                </div>
                <div className="hangedMan">
                    <div id="head"></div>
                </div>

            </div>)
        case 4:
            console.log("4");
            return (<div>
                <div className='hangman'></div>
                <form onSubmit={handleSubmit} id='container' style={{ display: showDom }}>
                    <input type="password" name="secretWord" id="form" />
                    <input type="submit" value='hide' />


                </form>
                <div className='box' style={{ background: color }}></div>
                Type your guess:
                <input type='text' maxLength="1"
                    placeholder='Input guess here'
                    onKeyUp={handleWriting} />

                <div
                    className='textContainer'
                    id='textbox'
                />
                {text}
                <div className="wrapper">
                    {dashes.map((letter, index) => {
                        return (<div key={index}>{letter}</div>)
                    }
                    )}



                </div>
                <div className="hangedMan">
                    <div id="head"></div>
                    <div id="body"></div>
                </div>

            </div>)
        case 3:
            console.log("3");
            return (<div>
                <div className='hangman'></div>
                <form onSubmit={handleSubmit} id='container' style={{ display: showDom }}>
                    <input type="password" name="secretWord" id="form" />
                    <input type="submit" value='hide' />


                </form>
                <div className='box' style={{ background: color }}></div>
                Type your guess:
                <input type='text' maxLength="1"
                    placeholder='Input guess here'
                    onKeyUp={handleWriting} />

                <div
                    className='textContainer'
                    id='textbox'
                />
                {text}
                <div className="wrapper">
                    {dashes.map((letter, index) => {
                        return (<div key={index}>{letter}</div>)
                    }
                    )}



                </div>
                <div className="hangedMan">
                    <div id="head"></div>
                    <div id="body"></div>
                    <div id="leftArm"></div>
                </div>

            </div>)
        case 2:
            console.log("2");
            return (<div>
                <div className='hangman'></div>
                <form onSubmit={handleSubmit} id='container' style={{ display: showDom }}>
                    <input type="password" name="secretWord" id="form" />
                    <input type="submit" value='hide' />


                </form>
                <div className='box' style={{ background: color }}></div>
                Type your guess:
                <input type='text' maxLength="1"
                    placeholder='Input guess here'
                    onKeyUp={handleWriting} />

                <div
                    className='textContainer'
                    id='textbox'
                />
                {text}
                <div className="wrapper">
                    {dashes.map((letter, index) => {
                        return (<div key={index}>{letter}</div>)
                    }
                    )}



                </div>
                <div className="hangedMan">
                    <div id="head"></div>
                    <div id="body"></div>
                    <div id="leftArm"></div>
                    <div id="rightArm"></div>
                </div>

            </div>)
        case 1:
            console.log("1");
            return (<div>
                <div className='hangman'></div>
                <form onSubmit={handleSubmit} id='container' style={{ display: showDom }}>
                    <input type="password" name="secretWord" id="form" />
                    <input type="submit" value='hide' />


                </form>
                <div className='box' style={{ background: color }}></div>
                Type your guess:
                <input type='text' maxLength="1"
                    placeholder='Input guess here'
                    onKeyUp={handleWriting} />

                <div
                    className='textContainer'
                    id='textbox'
                />
                {text}
                <div className="wrapper">
                    {dashes.map((letter, index) => {
                        return (<div key={index}>{letter}</div>)
                    }
                    )}



                </div>
                <div className="hangedMan">
                    <div id="head"></div>
                    <div id="body"></div>
                    <div id="leftArm"></div>
                    <div id="rightArm"></div>
                    <div id="leftLeg"></div>
                </div>

            </div>)

        case 0:
            console.log("0 game over");
            alert('game over');
            return (<div>
                <div className='hangman'></div>
                <form onSubmit={handleSubmit} id='container' style={{ display: showDom }}>
                    <input type="password" name="secretWord" id="form" />
                    <input type="submit" value='hide' />


                </form>
                <div className='box' style={{ background: color }}></div>
                Type your guess:
                <input type='text' maxLength="1"
                    placeholder='Input guess here'
                    onKeyUp={handleWriting} />

                <div
                    className='textContainer'
                    id='textbox'
                />
                {text}
                <div className="wrapper">
                    {dashes.map((letter, index) => {
                        return (<div key={index}>{letter}</div>)
                    }
                    )}



                </div>
                <div className="hangedMan">
                    <div id="head"></div>
                    <div id="body"></div>
                    <div id="leftArm"></div>
                    <div id="rightArm"></div>
                    <div id="leftLeg"></div>
                    <div id="rightLeg"></div>
                </div>

            </div>

            );


            break;
    }




}


export default Hangman;



