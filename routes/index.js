const express = require('express');
const nodemailer = require('nodemailer');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
})

// POST /send-email
router.post('/send-email', (req, res, next) => {
  let { email, subject, message } = req.body;

  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS 
    }
  });
  transporter.sendMail({
    from: '"Charlotte 👻" <charlotte.treuse7fff00@gmail.com>',
    to: email, 
    subject: subject, 
    text: message,
    html: `<strong>${message}</strong>`
  })
  .then(info => {
    res.render('message', { 
      'email': email,
      subject,
      message,
      info: JSON.stringify(info)
    })
  })
  .catch(error => next(error))
});

module.exports = router;
