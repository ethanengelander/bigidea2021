function handleClick(ev){
    alert(`I was clicked by ${ev.target.id} and the class on this button is ${ev.target.className}`);
    console.log(ev)
}
function handleTextChange(ev){
    console.log(ev)
    console.log(ev.target.value)
}