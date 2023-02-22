import { readFileSync } from 'node:fs';
console.log("Initializing type-knight...");
// access js file and get back string
// eventually this should loop through each .js file it can find in the directory
const fileName = 'test4.js';
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

// need function getVariableValue
// then pass just that to getVariableType

function getVariableValue(fileArray, foundVarIndex) {
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
    
    return assignee;
}
function getVariableType(fileArray, foundVarIndex) {
    // I'm not sure this will ever be 100% guaranteed so we will have to give a way to ignore the suggestions this gives
    const assignee = getVariableValue(fileArray, foundVarIndex);
    const assigneeArray = Array.from(assignee);
    console.log(assigneeArray);
    const firstAssigneeChar = assigneeArray[0];
    console.log(firstAssigneeChar);
    if (firstAssigneeChar === '{') {
        console.log('Object', assignee);
        return 'Object';
    } else if (firstAssigneeChar === '[') {
        console.log('Array', assignee);        
        return 'Array';
    } else if (firstAssigneeChar === '"' || firstAssigneeChar === '\''){
        console.log('String', assignee); 
        return 'String'; 
    } else if (Number(firstAssigneeChar) * 0 === 0) {
        console.log('Number', assignee);
        return 'Number';
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

module.exports = getVariableName;
