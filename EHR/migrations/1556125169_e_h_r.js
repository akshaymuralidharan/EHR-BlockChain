// Use deployer to state migration tasks.
var EHR = artifacts.require("ehr");
module.exports = function(deployer) {
 // deployment steps
 deployer.deploy(EHR);
};
