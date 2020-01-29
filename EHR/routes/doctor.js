var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('patient_search', { title: 'Express' });
    //res.send("Doctor view !")

  });

router.post('/setDoctor', function (req, res, next) {
    data = req.body;
    console.log(data);
    MyContract.methods.setDoctor(data.id, data.publickey, data.name, data.dob, data.addrs, data.email, data.gender, data.hospitalname, data.qualifications)
        .send({ from: coinbase, gas : 6000000 });
    res.send("Doctor Registered !")

    //sending login details to doctors email
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'youremail',
          pass: 'password'
        }
      });
      
      var mailOptions = {
        from: 'youremail',
        to: data.email,
        subject: 'Your Login Details',
        text: 'your public key is :'+ data.publickey
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

});

router.get('/getDoctor', function (req, res, next) {
    data = req.query;
    console.log(data);
    MyContract.methods.getDoctor(data.id)
        .call({ from: coinbase }).then((val) => {
            console.log(val);
            res.render("doctor_profile", {myData : val});
        })
});

module.exports = router;

