const admin = require("firebase-admin");
const express = require('express');

const app = express();
const PORT = process.env.PORT || 8082; 
const config = require('/etc/secrets/config')

app.use(express.json())

admin.initializeApp({
  credential: admin.credential.cert(config)
});

app.get('/', (req, res) => {
  res.send(':D')
})

app.post('/api/notification', (req, res) => {
  const { tokens=[], productName, store } = req.body
  console.log(req.body)

  for (const token of tokens) {
    admin.messaging().send({
      token: token, // ['token_1', 'token_2', ...]
      notification: {
        title: 'Basic Notification',
        body: 'This is a basic notification sent from the server!',
        imageUrl: 'https://my-cdn.com/app-logo.png',
      },
    })
  }

  res.json({'hello': 'world' })
});

app.listen(PORT)


console.log(':D')