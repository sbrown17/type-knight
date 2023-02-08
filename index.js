import { readFileSync } from 'node:fs';

console.log("Initializing type-knight...");
// access js file and get back string
const file = readFileSync('testFiles/test.js', 'utf-8');
console.log('test.js file: ', file);
const fileArray = file.split('');
console.log('file array: ', fileArray);

function findVariable(file, fileArray) {
    // find instance of var
    // get name of var
    // check if it is mutated
    const foundVar = file.indexOf('var');
    console.log('found var:', foundVar);
    if (foundVar >= 0)
        console.log(findDepth(fileArray, foundVar));
}

function findDepth(fileArray, fileIndex) {
    const bracketsOpened = bracketCounter(fileArray, '{');
    console.log('Opened Brackets: ', bracketsOpened);
    const bracketsClosed = bracketCounter(fileArray, '}');
    console.log('Closed Brackets: ', bracketsClosed);
    if (!bracketsOpened)
        return 0;     
    return bracketsOpened - bracketsClosed;
}

function bracketCounter(fileArray, targetChar) {
    console.log('Counting ' + targetChar + ' brackets');
    let count = 0;
    for (const x in fileArray) {
        if (fileArray[x] === targetChar)
            count++;
    }
    console.log('Found ' + count + ' ' + targetChar + ' brackets');
    return count;
}

findVariable(file, fileArray);
// count open "{" vs closed "}"
// search for var, let, const
    // leave vars in for loops alone
// check for assigned type on initilization
    // check every subsequent call of variable to see if it is mutated??
    // check if type is still relevent
    // check if proper operations are being applied to it
