const server = require('./config/server');
const router = require('./config/routes');
require('./config/database');

router(server);