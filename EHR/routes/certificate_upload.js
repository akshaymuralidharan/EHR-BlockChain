var express = require("express");
var router = express.Router();
var ipfsAPI = require("ipfs-api");
const fs = require("fs");
//const ipfsAPI = require("ipfs-api");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("certificate", { title: "Express" });
});

router.post("/setCertificate", function(req, res, next) {
    console.log(req.body.phone);
  phoneNo = req.body.phone;
  certificateBytes = req.files.certificate.data;
  console.log("Phone NO :", phoneNo);
  console.log("certificateBytes :", certificateBytes);

  const ipfs = ipfsAPI("ipfs.infura.io", "5001", { protocol: "https" });

  ipfs.files.add(certificateBytes, function(err, file) {
    if (err) throw err;
    ipfsHash = file[0].hash;
    console.log("ipfsHash :", ipfsHash);

    MyContract.methods
      .setCertificate(phoneNo, certificateBytes)
      .send({ from: coinbase, gas: 6000000 });
      console.log("certificate added")
    //res.send("Certificate Added !");
    res.redirect("/");
  });


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
});
module.exports = router;

