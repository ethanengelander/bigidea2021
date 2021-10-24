function spinTheWheel(minRotate, maxRotate){
    //return deg of spinning + rounds
    const numberOfRotationsInDeg = minRotate * 360 + (maxRotate-minRotate)*(Math.random()*360);

    const finalDifference = numberOfRotationsInDeg%360;
    let number = (finalDifference/60) +1 ;
    if(number>6) number =1;
    console.log(Math.ceil(number))

    return numberOfRotationsInDeg

}
// for(let i=0; i<20; i++){
//     console.log((spinTheWheel(4,6)>= 1440 && spinTheWheel(4,6) <= 2160)); 
// }
const wheel = document.getElementById('wheel');
wheel.addEventListener('transitionend',ev =>{
    alert(`the result is ${ev.target.dataset.result}`);
})
const rotation = spinTheWheel(4,6);
wheel.style.transform = `rotate(${-rotation}deg)`;
wheel.dataset.result = rotation.result;