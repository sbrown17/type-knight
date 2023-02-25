// this needs to be a function name instead of index and export it in index.js too
const getVariableName = require('./getVariableName');

test('returns name of variable', () => {
    expect(getVariableName('var testName = "this";')).toBe('testName');
});
