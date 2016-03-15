module.exports = () => {
  return {
    files: [
      {pattern: 'test/configs/config*', instrument: false},
      'index.js'
    ],
    tests: [
      'test/*Spec.js'
    ],
    debug: true,

    bootstrap: function () {
      global.expect = require('chai').expect;
    },

    env: {
      type: 'node'
    }
  };
};
