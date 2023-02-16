import { readFileSync } from 'node:fs';
console.log("Initializing type-knight...");
// access js file and get back string
// eventually this should loop through each .js file it can find in the directory
const fileName = 'test2.js';
const file = readFileSync('testFiles/' + fileName, 'utf-8');
console.log('test.js file:\n', file);
const fileArray = file.split('');

function findVariable(file, fileArray) {
    console.log('Searching for vars...');
    const foundVarIndex = file.indexOf('var');
    if (foundVarIndex < 0){
        console.log('Found 0 var\'s ', foundVarIndex);
        return;
    }

    const lineNumber = findLine(fileArray, foundVarIndex);
    const blockDepth = findDepth(fileArray, foundVarIndex);
    getVariableName(fileArray, foundVarIndex);
    getVariableType(fileArray, foundVarIndex);
    return foundVarIndex;
}

function findDepth(fileArray, foundVarIndex) {
    console.log('Finding block depth...');
    const bracketsOpened = bracketCounter(fileArray, foundVarIndex, '{');
    const bracketsClosed = bracketCounter(fileArray, foundVarIndex, '}');
    if (!bracketsOpened)
        return 0;     
    const blockDepth = bracketsOpened - bracketsClosed;
    console.log('var at depth of: ', blockDepth);
    return blockDepth;
}

function bracketCounter(fileArray, foundVarIndex, targetChar) {
    const shortArray = fileArray.slice(0, foundVarIndex);
    const targetCharArray = shortArray.filter(x => x === targetChar);
    return targetCharArray.length;
}

function findLine(fileArray, foundVarIndex) {
    const shortArray = fileArray.slice(0, foundVarIndex);
    const newLineCount = shortArray.filter(x => x === '\n').length + 1;
    console.log('Found on line: ', newLineCount);
    return newLineCount;
}

function getVariableAttributes(fileArray, foundVarIndex){
    return variableAttributes = {
        name: getVariableName(fileArray, foundVarIndex),
        type: getVariableType(fileArray, foundVarIndex),
        mutated: variableHasBeenMutated(fileArray)
    };
}

function getVariableName(fileArray, foundVarIndex) {
    const arrayStartingAtVar = fileArray.slice(foundVarIndex);
    const variableNameIndex = arrayStartingAtVar.indexOf(' ') + foundVarIndex + 1;
    const arrayStartingAtName = fileArray.slice(variableNameIndex);
    const endVariableNameIndex = arrayStartingAtName.indexOf(' ');
    return arrayStartingAtName.slice(0, endVariableNameIndex);
}

function getVariableType(fileArray, foundVarIndex) {
    // seems like variables cant be assigned on the same line without ;
    const arrayStartingAtVar = fileArray.slice(foundVarIndex);
    const assignmentOperatorIndex = arrayStartingAtVar.indexOf('=');
    const nextNewline = arrayStartingAtVar.indexOf('\n');
    const nextSemicolon = arrayStartingAtVar.indexOf(';');
    // endAssignment gets the index of the end of the assignment, we now have the end for the target array
    const endAssignment = nextNewline > nextSemicolon ? nextNewline : nextSemicolon;
    // take index of = to index of endAssignment, trim whitespace and you're left with the assignee
    const assignee = arrayStartingAtVar.slice(assignmentOperatorIndex + 1, endAssignment).join('').trim();
    console.log('the assignee is: ', assignee);
    if (assignee.includes('"') || assignee.includes("'")) {
        console.log('it\'s a string!');
        return 'string';
    } else if (assignee.includes('.') || parseInt(assignee) / 1 === parseInt(assignee)) {
        console.log('idk it\'s a number of some sort');
        return 'number';
    }
}

findVariable(file, fileArray);
// count open "{" vs closed "}"
// search for var, let, const
    // warn that var in for loops have a different outcome than let for the counter
// check for assigned type on initilization
    // check every subsequent call of variable to see if it is mutated??
    // check if type is still relevent
    // check if proper operations are being applied to it
