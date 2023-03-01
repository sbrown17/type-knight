// this needs to be a function name instead of index and export it in index.js too
const { getVariableName, getVariableValue } = require('./index.js');
const testFile = 
`var exampleVariable;

for (var i; i < 10; i++){
    exampleVariable += 1;
    console.log(exampleVariable);
}`;

test.todo('returns name of variable', () => {
    expect(getVariableName(testFile)).toBe('exampleVariable');
});
