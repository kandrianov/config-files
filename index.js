'use strict';

const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

function loadYAMLConfig(filepath) {
  try {
    return yaml.safeLoad(fs.readFileSync(filepath, 'utf8')) || {};
  } catch (e) {
    e.message = `Cannot read config file: ${filepath}'\nError: ${e.message}`;
    throw e;
  }
}

function loadTXTConfig(filepath) {
  const obj = {};

  const src = fs.readFileSync(filepath, 'utf8') || '';

  // convert Buffers before splitting into lines and processing
  src.toString().split('\n').forEach(function (line) {

    // matching "KEY' and 'VAL' in 'KEY=VAL'
    const keyValueArr = line.match(/^\s*([\w\.\-]+)\s*=\s*(.*)?\s*$/);
    // matched?


    if (keyValueArr !== null) {
      const key = keyValueArr[1];

      // default undefined or missing values to empty string
      let value = keyValueArr[2] ? keyValueArr[2] : '';

      // expand newlines in quoted values
      const len = value ? value.length : 0;
      if (len > 0 && value.charAt(0) === '\"' && value.charAt(len - 1) === '\"') {
        value = value.replace(/\\n/gm, '\n');
      }

      // remove any surrounding quotes and extra spaces
      value = value.replace(/(^['"]|['"]$)/g, '').trim();

      obj[key] = value;
    }
  });

  return obj;
}


function loadFile(filepath) {
  let config;

  const file = path.resolve(filepath);
  switch (path.extname(file)) {
    case '.yaml':
    case '.yml':
      config = loadYAMLConfig(file);
      break;
    default:
      config = loadTXTConfig(file);
  }

  return config;
}

function mergeConfig(from, to) {
  Object.keys(from).forEach(key => to[key] = from[key]);
  return to;
}

module.exports = {
  load: loadFile,
  merge: mergeConfig
};
