import { readFile } from 'node:fs';
console.log("Initializing type-knight...");
// access js file
var files = readFile('testFiles/test.js', (err, data) => {
    if (err) throw err;
    console.log(data.toString());
});
// turn js file into string
// count open "{" vs closed "}"
// search for var, let, const
    // leave vars in for loops alone
// check for assigned type on initilization
    // check every subsequent call of variable to see if it is mutated??
    // check if type is still relevent
    // check if proper operations are being applied to it
