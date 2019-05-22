const express = require('express');
const os = require('os');
const controllers = require('./controllers')

const app = express();

app.use(express.static('dist'));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

app.post('/api/signup', controllers.signUp)

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));