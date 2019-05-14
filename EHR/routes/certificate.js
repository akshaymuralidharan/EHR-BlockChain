var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("certificate", { title: "Express" });
});

router.post("/setCertificate", function(req, res, next) {
  data = req.body;
  console.log(data);
  MyContract.methods
    .setCertificate(data.phone, data.certhash)
    .send({ from: coinbase, gas: 6000000 });
  res.send("Certificate Added !");
});

// router.get('/getPatient', function (req, res, next) {
//     data = req.query;
//     console.log(data);
//     MyContract.methods.getPatient(data.phone)
//         .call({ from: coinbase }).then((val) => {
//             console.log(val);
//             res.render("patient_profile", {myData : val});
//         })
// });
router.get("/getCertificate", function(req, res, next) {
  data = req.query;
  console.log(data);
  result = [];
  MyContract.methods
    .certcount(data.phone)
    .call()
    .then(async count => {
      for (i = 0; i <= count; i++) {
        //await new Promise(next => {
          //console.log("ivide ethi");
           await MyContract.methods
            .addcerti(data.phone, i)
            .call()
            .then(res => {
              console.log(res);
              console.log(count);
              result.push(res);
            });
        //});
        
      }
      console.log(result);
      res.render("certificate_view", {result, count});
    
    });
});

module.exports = router;
