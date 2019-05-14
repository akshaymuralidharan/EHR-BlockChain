var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('hospital', { title: 'Express' });
  });

router.post('/setHospital', function (req, res, next) {
    data = req.body;
    console.log(data);
    publickey = web3.eth.personal.newAccount(' ').then(console.log);
    MyContract.methods.setHospital(data.id, publickey, data.name, data.email, data.phone, data.ownership, data.state, data.place, data.haddress)
        .send({ from: coinbase, gas : 6000000 });
    res.send("Hospital Registered !")

    //sending login details to doctors email
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'kichu0000007@gmail.com',
          pass: 'Kichu@54321'
        }
      });
      
      var mailOptions = {
        from: 'kichu0000007@gmail.com',
        to: data.email,
        subject: 'Hospital Registration Details',
        text:  'Your hospital has been registered in our network. Our developer will be reaching you with in 7 working days for the further installation process of the software in your hospital.' +
        
        'Your public key is : ' +publickey
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

});

router.get('/getHospital', function (req, res, next) {
    data = req.query;
    console.log(data);
    MyContract.methods.getHospital(data.id)
        .call({ from: coinbase }).then((val) => {
            console.log(val);
            res.render("hospital_profile", {myData : val});
        })
});

module.exports = router;


