

const numbers = [1000,0.05,1,10]
const initial = numbers[0]
const interest=numbers[1]
const frequency=numbers[2]
const time=numbers[3]
var broski=initial
for( let i=time*frequency;i>0;i--){
    broski=broski+broski*interest/frequency;
    
}
console.log(broski);