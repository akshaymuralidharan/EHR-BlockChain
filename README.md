# EHR-BlockChain
Electronic Health Record in Blockchain ethereum

# NodeJs

`npm install`

`npm install nodemailer`

`sudo apt-get install build-essential`

# Run Geth

`geth --identity "miner" --networkid 4002 --datadir  dev --rpc --rpcport "8545" --unlock 0 --ipcpath "~/.ethereum/geth.ipc" --rpccorsdomain "*" --rpcapi "db,eth,net,web3,personal" --dev`

# Truffle

Before running truffle migrate delete the 'build' folder from the project and run truffle migrate.


`truffle compile`

`truffle migrate`

# app.js
Once you have migrate the truffle update the coinbase address from app.js

coinbase = "0x424AE0acc7a5D0D54259d0E50f30a9A0a39f3BF6";
