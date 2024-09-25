const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {
  suite('ConvertHandler Assertions', function() {
    test('should correctly read a whole number input', function() {
      assert.strictEqual(convertHandler.getNum('32km'), 32);
    });
    test('should correctly read a decimal number input', function() {
      assert.strictEqual(convertHandler.getNum('3.2km'), 3.2);
    });
    test('should correctly read a fractional input', function() {
      assert.strictEqual(convertHandler.getNum('3/4km'), 0.75);
    });
    test('should correctly read a fractional input with a decimal', function() {
      assert.strictEqual(convertHandler.getNum('3.5/4km'), 0.875);
    });
    test('should correctly return an error on a double-fraction', function() {
      assert.throws(() => convertHandler.getNum('3/4/5km'), 'invalid number');
    });
    test('should correctly default to a numerical input of 1 when no numerical input is provided', function() {
      assert.strictEqual(convertHandler.getNum('km'), 1);
    });
    test('should correctly read each valid input unit', function() {
      assert.strictEqual(convertHandler.getUnit('32gal'), 'gal');
      assert.strictEqual(convertHandler.getUnit('32l'), 'L');
      assert.strictEqual(convertHandler.getUnit('32mi'), 'mi');
      assert.strictEqual(convertHandler.getUnit('32km'), 'km');
      assert.strictEqual(convertHandler.getUnit('32lbs'), 'lbs');
      assert.strictEqual(convertHandler.getUnit('32kg'), 'kg');
    });
    test('should correctly return an error for an invalid input unit', function() {
      assert.throws(() => convertHandler.getUnit('3kms'), 'invalid unit');
    });
    test('should return the correct return unit for each valid input unit', function() {
      assert.strictEqual(convertHandler.getReturnUnit('gal'), 'L');
      assert.strictEqual(convertHandler.getReturnUnit('l'), 'gal');
      assert.strictEqual(convertHandler.getReturnUnit('mi'), 'km');
      assert.strictEqual(convertHandler.getReturnUnit('km'), 'mi');
      assert.strictEqual(convertHandler.getReturnUnit('lbs'), 'kg');
      assert.strictEqual(convertHandler.getReturnUnit('kg'), 'lbs');
    });
    test('should correctly return the spelled-out string unit for each valid input unit', function() {
      assert.strictEqual(convertHandler.spellOutUnit('gal'), 'gallons');
      assert.strictEqual(convertHandler.spellOutUnit('l'), 'liters');
      assert.strictEqual(convertHandler.spellOutUnit('mi'), 'miles');
      assert.strictEqual(convertHandler.spellOutUnit('km'), 'kilometers');
      assert.strictEqual(convertHandler.spellOutUnit('lbs'), 'pounds');
      assert.strictEqual(convertHandler.spellOutUnit('kg'), 'kilograms');
    })
    test('should correctly convert gal to L', function() {
      assert.strictEqual(convertHandler.convert(1, 'gal'), 3.78541);
    });
    test('should correctly convert L to gal', function() {
      assert.strictEqual(convertHandler.convert(1, 'l'), 0.26417);
    });
    test('should correctly convert mi to km', function() {
      assert.strictEqual(convertHandler.convert(1, 'mi'), 1.60934);
    });
    test('should correctly convert km to mi', function() {
      assert.strictEqual(convertHandler.convert(1, 'km'), 0.62137);
    });
    test('should correctly convert lbs to kg', function() {
      assert.strictEqual(convertHandler.convert(1, 'lbs'), 0.45359);
    });
    test('should correctly convert kg to lbs', function() {
      assert.strictEqual(convertHandler.convert(1, 'kg'), 2.20462);
    });
  });
});
