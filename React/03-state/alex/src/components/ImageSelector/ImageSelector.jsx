import React, {useState} from 'react';
import './ImageSelector.css';
import shark from '../../shark.jpg';
import alaska from '../../alaska.jpg';
import boat from '../../boat.jpg';

let image = boat;
function ImageSelector(){

    const[color, setColor] = useState('white');
    const[variable, setVariable] = useState();

    function changeSRC(ev){
        let selectSRC = ev.target.currentSrc;
        console.log(ev);
        setVariable(selectSRC);
    }

    return(
        <div>
            <div className='box1'  onClick={changeSRC}>
                <img style={{width:"100px", height:"100px"}} src={shark}></img>
            </div>
            <div className='box2' onClick={changeSRC}>
            <img src={boat} style={{width:"100px", height:"100px"}}></img>
            </div>
                
            <div className='box3'  onClick={changeSRC}>
            <img src={alaska} style={{width:"100px", height:"100px"}}></img>
            </div>
            <div className='changeBox' style={{width:"100px", height:"100px"}} >
                <img src={variable} style={{width:"100px", height:"100px"}}></img>
            </div>
        </div>
    )
}

export default ImageSelector;
