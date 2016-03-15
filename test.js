const configParser = require('./index');

const config = configParser.load('test/configs/config');
// configParser.merge(config, process.env);

console.log(config);
