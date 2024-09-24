function ConvertHandler() {
  const baseInputRegexp = new RegExp(/^([^A-Za-z]*)([A-Za-z]*)([^A-Za-z]|[0-9]*)/);

  const unitConversion = {
    gal: 'L',
    l: 'gal',
    mi: 'km',
    km: 'mi',
    lbs: 'kg',
    kg: 'lbs'
  };

  this.getNum = function(input) {
    let result;

    const rawMatch = input.match(baseInputRegexp);
    if (!rawMatch) {
      return 1;
    }

    const rawNum = rawMatch[1];
    switch (true) {
      case rawNum === '': {
        result = 1;
        break;
      }
      case rawNum.includes(','):
      case (rawNum.split('/').length - 1) > 1:
        throw new Error('invalid number');
      case (rawNum.split('/').length - 1) === 1: {
        const [numerator, denominator] = rawNum.split('/');
        result = parseFloat(numerator) / parseFloat(denominator);
        break;
      }
      default: {
        result = parseFloat(rawNum);
      }
    }

    return result;
  };
  
  this.getUnit = function(input) {
    const rawMatch = input.match(baseInputRegexp);
    if (!rawMatch || rawMatch[3]) {
      throw new Error('invalid unit');
    }

    const rawUnit = rawMatch[2].toLowerCase();

    if (!unitConversion[rawUnit]) {
      throw new Error('invalid unit');
    }

    return rawUnit;
  };
  
  this.getReturnUnit = function(initUnit) {
    return unitConversion[initUnit];
  };

  this.spellOutUnit = function(unit) {
    const spellOutUnitConversion = {
      gal: 'gallons',
      l: 'liters',
      mi: 'miles',
      km: 'kilometers',
      lbs: 'pounds',
      kg: 'kilograms'
    }
    return spellOutUnitConversion[unit];
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    const numConversion = {
      gal: galToL,
      l: 1 / galToL,
      mi: miToKm,
      km: 1 / miToKm,
      lbs: lbsToKg,
      kg: 1 / lbsToKg
    };

    const result = initNum * numConversion[initUnit];

    return result.toFixed(5);
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${this.spellOutUnit(initUnit.toLowerCase())} ` +
      `converts to ${returnNum} ${this.spellOutUnit(returnUnit.toLowerCase())}`;
    return result;
  };
}

module.exports = ConvertHandler;
