const { connect, connection } = require('mongoose');

// mongoose.set('debug', true);

connect('mongodb://localhost/developersApplications', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
