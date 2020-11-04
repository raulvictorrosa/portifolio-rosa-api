const express = require('express');
const server = express();

const runServer = async () => {
  await require('./db').connect();

  server.use('/api/v1/portifolios', require('./routes/portifolios'));

  const PORT = parseInt(process.env.PORT, 10) || 3001;
  server.listen(PORT, err => {
    if (err) console.error(err);
    console.log('Server ready on port', PORT);
  });
};

runServer();