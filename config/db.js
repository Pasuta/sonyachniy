const Config = {};

Config.production = {
  name: 'son',
  user: 'sonuser',
  password: 'son2017',
  host: 'localhost',
  port: 19519
};

Config.staging = {
  name: 'son',
  user: 'sonuser',
  password: 'son2017',
  host: 'localhost',
  port: 19519
};

Config.dev = {
  name: 'son',
  port: 27017,
  host: 'localhost',
  user: null,
  password: null
};

Config['unit-test'] = {
  name: 'plano-visit-test',
  port: 27017,
  host: 'localhost',
  user: null,
  password: null
};

module.exports = Config;
