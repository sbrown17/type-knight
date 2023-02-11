import { readFileSync } from 'node:fs';

console.log("Initializing type-knight...");
// access js file and get back string
const file = readFileSync('testFiles/test2.js', 'utf-8');
console.log('test.js file: ', file);
const fileArray = file.split('');
// console.log('file array: ', fileArray);

function findVariable(file, fileArray) {
    // get name of var
    // check if it is mutated
    const foundVarIndex = file.indexOf('var');
    if (foundVarIndex < 0){
        console.log('Found 0 var\'s ', foundVarIndex);
        return;
    }

    console.log('found var at array index: ', foundVarIndex);
    console.log('finding block depth: ');
    const blockDepth = findDepth(fileArray, foundVarIndex);
    const lineNumber = findLine(fileArray, foundVarIndex);
    console.log('var is on line: ', lineNumber);
    getVariableName(fileArray, foundVarIndex);
    return foundVarIndex;
}

function findDepth(fileArray, foundVarIndex) {
    const bracketsOpened = bracketCounter(fileArray, foundVarIndex, '{');
    console.log('Opened Brackets: ', bracketsOpened);
    const bracketsClosed = bracketCounter(fileArray, foundVarIndex, '}');
    console.log('Closed Brackets: ', bracketsClosed);
    if (!bracketsOpened)
        return 0;     
    return bracketsOpened - bracketsClosed;
}

function bracketCounter(fileArray, foundVarIndex, targetChar) {
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

function findLine(fileArray, foundVarIndex) {
    let lineNumber = 1;
    for (const x in fileArray) {
        if (x <= foundVarIndex &&
            fileArray[x] === '\n')
            lineNumber++;
    }
    return lineNumber;
}

function getVariableAttributes(fileArray, foundVarIndex){
    return variableAttributes = {
        name: getVariableName(fileArray, foundVarIndex),
        type: variableType,
        mutated: variableMutated
    };
}

function getVariableName(fileArray, foundVarIndex) {
    const arrayStartingAtVar = fileArray.slice(foundVarIndex);
    const variableNameIndex = arrayStartingAtVar.indexOf(' ') + foundVarIndex + 1;
    const arrayStartingAtName = fileArray.slice(variableNameIndex);
    const endVariableNameIndex = arrayStartingAtName.indexOf(' ');
    return arrayStartingAtName.slice(0, endVariableNameIndex);
}

findVariable(file, fileArray);
// count open "{" vs closed "}"
// search for var, let, const
    // warn that var in for loops have a different outcome than let for the counter
// check for assigned type on initilization
    // check every subsequent call of variable to see if it is mutated??
    // check if type is still relevent
    // check if proper operations are being applied to it
