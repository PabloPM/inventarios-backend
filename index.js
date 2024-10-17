const admin = require("firebase-admin");
const express = require('express');

const app = express();
const PORT = process.env.PORT || 8082; 
const config = require('/etc/secrets/config.json')

app.use(express.json())

admin.initializeApp({
  credential: admin.credential.cert(config)
});

app.get('/', (req, res) => {
  res.send(':D')
})

app.post('/api/notification', (req, res) => {
  const { tokens=[], productName='', sales = '' } = req.body
  console.log(req.body)

  for (const token of tokens) {
    admin.messaging().send({
      token: token, // ['token_1', 'token_2', ...]
      data:{
        notifee: {
          body: `${sales} solicita ${productName}`,
          android: {
            channelId: 'default',
            actions: [
              {
                title: 'Mark as Read',
                pressAction: {
                  id: 'read',
                },
              },
            ],
          }
        } 
      },
      notification: {
        title: `Pedido de ${sales}`,
        body: `${sales} solicita ${productName}`,
      },
    })
  }

  res.json({'hello': 'world' })
});

app.listen(PORT)


console.log(':D')