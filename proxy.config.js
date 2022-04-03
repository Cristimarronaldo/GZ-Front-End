const PROXY_CONFIG = [
   {
      context: ['/api'],
      target: 'https://localhost:44385/api/v1/',
      secure: false,
      logLevel: 'debug'
   }
];


module.exports = PROXY_CONFIG;
