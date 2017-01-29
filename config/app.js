var Config = {};

Config.all = {
  port: 3001,
  routes: {
    'freeaccess': [
      '/',
      '/admin/login',
      '/contacts',
      '/about',
      '/media',
      '/common',
      '/childtocamp',
      '/sendtocamp',
      '/daily',
      '/eat',
      '/visit',
      '/attention',
      '/eating',
      '/medical',
      '/jobs'
    ],
    'secured': [
      '/admin',
      '/admin/logout',
      '/admin/login'
    ]
  },
  models: [
    'visit',
    'photo',
    'planogram',
    'product',
    'survey',
    'target',
    'analysis',
    'remote',
    'forms',
    'visit-dispatcher',
    'cci7',
    'cci-monthly',
    'visit-backup',
    'id-generator',
    'stitched-photo'
  ],
  admin: {
    'email': 's_tabir2016@ukr.net',
    'password': 'tabir2017',
    'authToken': 'e91e6348157868de9dd8b25c81aebfb9' // yeah yeah tell me about security
  }
};

Config.production = {
};

Config.staging = {
};

Config.dev = {
};

Config['unit-test'] = {
};

module.exports = Config;
