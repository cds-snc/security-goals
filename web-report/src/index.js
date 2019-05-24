import http from 'http';

let app = require('./server').default;

const server = http.createServer(app);

let currentApp = app;

const getEnv = c => process.env[c];
const port = getEnv('PORT')

server.listen(port, error => {
  if (error) {
    console.log(error);
  }

  console.log(`🚀 started on ${port}`);
});

if (module.hot) {
  console.log('✅  Server-side HMR Enabled!');

  module.hot.accept('./server', () => {
    console.log('🔁  HMR Reloading `./server`...');

    try {
      app = require('./server').default;
      server.removeListener('request', currentApp);
      server.on('request', app);
      currentApp = app;
    } catch (error) {
      console.error(error);
    }
  });
}
