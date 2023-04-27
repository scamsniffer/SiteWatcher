const axios = require('axios');
const dns = require("dns");
(async () => {
  const { data: config } = await axios.get(
    "https://cdn.jsdelivr.net/gh/MetaMask/eth-phishing-detect@master/src/config.json"
  );

  const domains = config.blacklist.slice(200, 400);

  const validDomains = [];

  for (let index = 0; index < domains.length; index++) {
    const domain = domains[index];

    const result = await new Promise((resolve, reject) => {
      dns.resolve(domain, (err, result) => {
        if (err) {
          // console.log(err);
        }
        resolve(result);
      });
    });
     console.log("domain", domain, result);
    if (result) {
       
        validDomains.push(domain);
    }
  }
  console.log("config", config.blacklist, JSON.stringify(validDomains));
})();