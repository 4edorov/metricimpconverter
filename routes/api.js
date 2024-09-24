'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get(function (req, res) {
    const input = req.query.input;

    try {
      let initNum;
      let initNumErr;
      let initUnit;
      let initUnitErr;

      try {
        initNum = convertHandler.getNum(input);
      } catch (err) {
        initNumErr = err;
      }
      try {
        initUnit = convertHandler.getUnit(input);
      } catch (err) {
        initUnitErr = err;
      }

      if (initNumErr && initUnitErr) {
        throw new Error('invalid number and unit');
      } else if (initNumErr || initUnitErr) {
        throw new Error(initNumErr?.message || initUnitErr?.message);
      }

      const returnNum = convertHandler.convert(initNum, initUnit);
      const returnUnit = convertHandler.getReturnUnit(initUnit);
      const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

      res.send({
        initNum,
        initUnit,
        returnNum,
        returnUnit,
        string
      });
    } catch (err) {
      res.send(err.message);
    }
  });
};
