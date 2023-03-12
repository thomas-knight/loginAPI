const express = require('express');
const app = express()
const path = require('node:path');
const bcrypt = require('bcrypt');
const db = require('./bcrypt.js')



app.all('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'front.html'));
})
app.all('/reg', (req, res) => {
  res.sendFile(path.join(__dirname, 'reg.html'));
})

app.get('/', function(req, res, next) {
  res.render('front', { title: 'loginAPI' })
})


//login query
app.get('/front', async function(req, res, next) {
  var user = req.query.user
  var pass = req.query.pass
  
  var tst2 = await db.query(`SELECT * FROM loginAPI WHERE username = '${user}'`)
  

  if (tst2.length === 0) { return; }

  bcrypt.compare(pass, tst2[0].password, function(err, result) {
    if (result !== true) {
      res.sendFile(path.join(__dirname, 'front.html'));
    } else {
      res.sendFile(path.join(__dirname, 'in.html'));
    }
  });

})






app.get('/register', function(req, res, next) {
  var reguser = req.query.reguser;
  var regpass = req.query.regpass;

  const saltRounds = 10;

  bcrypt.hash(regpass, saltRounds, function(err, hash) {
    db.getPool().query(`INSERT INTO loginAPI(username, password) 
      VALUES( '${reguser}', '${hash}')`)
  })

  res.redirect('/')
})



app.listen(8080, () => { console.log('running') }) 