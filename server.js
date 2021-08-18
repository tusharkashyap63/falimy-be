require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const userRoutes = require('./controllers/user.controller');
const familyRoutes = require('./controllers/family.controller');

const source = process.env.ATLAS_CONNECTION;
const PORT = process.env.PORT || 5000;
const domain = process.env.AUTH0_DOMAIN;
const audience = process.env.AUTH0_AUDIENCE;

const app = express();

const authorizeAccessToken = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${domain}/.well-known/jwks.json`,
  }),
  audience: audience,
  issuer: `https://${domain}/`,
  algorithms: ['RS256'],
});

app.use(cors());
app.use(express.json());
app.use(authorizeAccessToken);
app.use('/api/users', userRoutes);
app.use('/api/families', familyRoutes);

mongoose.connect(source, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('DB is connected');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// app.get('/api/v1/users/:user_id', (req, res) => {
//   console.log(req.params);
//   res.send('Done');
// });
