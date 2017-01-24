var Config = {};

Config.all = {
  port: 3001,
  routes: [
    'index',
    'heartbeat',
    'plaj',
    'visits',
    'sync/visits',
    'sync/photos',
    'heatmap',
    'planograms',
    'external/forms',
    'external/photos',
    'debug',
    'reanalyze'
  ],
  resources: {
    internal: ['analyses', 'photos', 'planograms', 'products', 'visits', 'forms'],
    external: ['photos', 'visits']
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
  idGenerators: [{ type: 'visitId', counter: 60000000 }],
  reanalyzeMaximum: process.env.REANALYZE_MAXIMUM || 5000,
  logging: 'trace'
};

Config.production = {
  logging: process.env.LOG_LEVEL || 'info',
  tasks: ['read-planoconfig'],
  logentriesToken: 'd74e8cc2-e692-4d83-9718-d8a69ee22c52'
};

Config.staging = {
  logging: process.env.LOG_LEVEL || 'info',
  tasks: ['read-planoconfig'],
  logentriesToken: 'e4b09ad5-2a26-42bb-8bd1-f2d36c5f12b1'
};

Config.dev = {
  logging: 'trace',
  tasks: ['read-planoconfig']
};

Config['unit-test'] = {
  port: 8902,
  logging: process.env.CI ? 'trace' : 'off',
  tasks: []
};

module.exports = Config;
