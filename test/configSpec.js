const configParser = require('./../index');

describe('parse files', function () {

  it('should return config from YAMLfile', () => {
    expect(configParser.load('test/configs/config.yml')).to.have.property('foo').to.be.equal('bar');
  });

  it('should return config from YAMLfile', () => {
    expect(configParser.load('test/configs/config')).to.have.property('foo').to.be.equal('bar');
  });

});

describe('merge config with obj', function () {

  const config = configParser.load('test/configs/config.yml');

  it('should merge', () => {
    expect(configParser.merge(config, {baz: 'bar'})).to.have.property('foo').to.be.equal('bar');
    expect(configParser.merge(config, {baz: 'bar'})).to.have.property('baz').to.be.equal('bar');
  });

});

