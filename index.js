import { readFileSync } from 'node:fs';
console.log("Initializing type-knight...");
// access js file and get back string
const file = readFileSync('testFiles/test.js', 'utf-8');
const fileArray = file.split('');
function findVariable(fileArray) {
    
}
function findDepth(fileArray, fileIndex) {
    const bracketsOpened = bracketCounter(fileArray, '{');
    const bracketsClosed = bracketCounter(fileArray, '}');
    return bracketsOpened - bracketsClosed;
}

function bracketCounter(fileArray, targetChar) {
    let count = 0;
    for(x in fileArray){
        if (x === targetChar)
            count++;
    }
    return count;
}
// count open "{" vs closed "}"
// search for var, let, const
    // leave vars in for loops alone
// check for assigned type on initilization
    // check every subsequent call of variable to see if it is mutated??
    // check if type is still relevent
    // check if proper operations are being applied to it
