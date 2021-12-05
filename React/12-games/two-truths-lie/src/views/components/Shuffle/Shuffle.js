import React, { useEffect, useState } from 'react';




function Shuffle({ true1, true2, untrue }) {
    // const [true1, setTrue1] = useState("Testing true 1");
    // const [true2, setTrue2] = useState("Testing true 2");
    // const [untrue, setUntrue] = useState("Testing untrue");

    console.log('suffle runs....');
    let answers = [true1, true2, untrue];
    answers = shuffle(answers);



    const [box1, setBox1] = useState("temp");
    const [box2, setBox2] = useState("temp");
    const [box3, setBox3] = useState("temp");
   



    useEffect(() => {
       console.log(answers)
        setBox1(answers[0]);
        setBox2(answers[1]);
        setBox3(answers[2]);

    }, [])


    // shufflePositions();

    // function shufflePositions() {
    //     untruePosition = Math.ceil(Math.random() * 3)
    //     let randomNumber2 = Math.ceil(Math.random() * 2)
    //     if (randomNumber2 === 1) {
    //         if (untruePosition === 1) {
    //             setBox1(untrue);
    //             setBox2(true1);
    //             setBox3(true2);
    //         }
    //         else if (untruePosition === 2) {
    //             setBox1(true1);
    //             setBox2(untrue);
    //             setBox3(true2);
    //         }
    //         else if (untruePosition === 3) {
    //             setBox1(true1);
    //             setBox2(true2);
    //             setBox3(untrue);
    //         }
    //     }
    //     if (randomNumber2 === 2) {
    //         if (untruePosition === 1) {
    //             setBox1(untrue);
    //             setBox2(true2);
    //             setBox3(true1);
    //         }
    //         else if (untruePosition === 2) {
    //             setBox1(true2);
    //             setBox2(untrue);
    //             setBox3(true1);
    //         }
    //         else if (untruePosition === 3) {
    //             setBox1(true2);
    //             setBox2(true1);
    //             setBox3(untrue);
    //         }
    //     }


    // }

    function handleClick(ev) {
        ev.preventDefault();

    }



    return (
        <div className="App">
            <div className="container">
                <div className="box1" onClick={handleClick}>{box1}</div>
                <div className="box2" onClick={handleClick}>{box2}</div>
                <div className="box3" onClick={handleClick}>{box3}</div>

            </div>
        </div>
    );
}

export default Shuffle;

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}