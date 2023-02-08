import { readFileSync } from 'node:fs';

console.log("Initializing type-knight...");
// access js file and get back string
const file = readFileSync('testFiles/test2.js', 'utf-8');
console.log('test.js file: ', file);
const fileArray = file.split('');
console.log('file array: ', fileArray);

function findVariable(file, fileArray) {
    // find instance of var
    // get name of var
    // check if it is mutated
    const foundVarIndex = file.indexOf('var');
    console.log('found var: ', foundVarIndex);
    if (foundVarIndex >= 0)
        console.log('Depth: ', findDepth(foundVarIndex));
}

function findDepth(foundVarIndex) {
    const bracketsOpened = bracketCounter(foundVarIndex, '{');
    console.log('Opened Brackets: ', bracketsOpened);
    const bracketsClosed = bracketCounter(foundVarIndex, '}');
    console.log('Closed Brackets: ', bracketsClosed);
    if (!bracketsOpened)
        return 0;     
    return bracketsOpened - bracketsClosed;
}

function bracketCounter(foundVarIndex, targetChar) {
    console.log('Counting ' + targetChar + ' brackets');
    let count = 0;
    for (const x in fileArray) {
        if (x <= foundVarIndex &&
            fileArray[x] === targetChar)
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
