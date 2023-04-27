const projects = require("./watchList.json");
const dns = require("dns");
const fetch = require("node-fetch");
const fs = require("fs");
const statusFile = __dirname + "/database/status.json";
let database = null;
let allIp = new Map();
const MAX_SIZE = 20;

async function loadDatabase() {
  database = JSON.parse(fs.readFileSync(statusFile, "utf-8"));
  Object.keys(database).forEach((domain) => {
    const config = database[domain];
    config.recent.forEach((item) => {
      allIp.set(item.ip, item);
    });
  });
}

async function lookupIp(ip) {
  const cache = allIp.get(ip);
  if (cache) {
    return {
      ip,
      isp: cache.isp,
      organization: cache.organization,
    };
  }
  const req = await fetch(
    "https://api.ipgeolocation.io/ipgeo?include=hostname&ip=" + ip,
    {
      headers: {
        authority: "api.ipgeolocation.io",
        accept: "application/json",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "en,ar;q=0.9,zh;q=0.8,zh-CN;q=0.7",
        referer: "https://api.ipgeolocation.io/ipgeo?include=hostname&ip=",
        "sec-ch-ua":
          'Chromium";v="104", " Not A;Brand";v="99", "Google Chrome";v="104',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "macOS",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "user-agent":
          " Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36",
      },
      referrer: "https://ipgeolocation.io/",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: null,
      method: "GET",
      mode: "cors",
      credentials: "omit",
    }
  );
  const detail = await req.json();
  return {
    ip,
    isp: detail.isp,
    organization: detail.organization,
  };
}

async function saveDatabase() {
  fs.writeFileSync(statusFile, JSON.stringify(database, null, 2));
}

function wait(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

async function checkDNS(domain) {
  const state = await new Promise((resolve, reject) => {
    dns.resolve(domain, (err, result) => {
      resolve({
        err,
        result,
      });
    });
  });
  // if (state.err) return
  const recentIp = state.err ? [] : state.result;
  const config = database[domain] || {
    domain,
    recent: [],
  };
  config.records = recentIp;
  config.lastScan = new Date().toISOString();
  const newIps = recentIp.filter(
    (ip) => !config.recent.find((c) => c.ip === ip)
  );
  for (let index = 0; index < newIps.length; index++) {
    const ip = newIps[index];
    try {
      const ipDetail = await lookupIp(ip);
      console.log("ipDetail", ipDetail);
      config.recent.unshift({
        ip: ip,
        date: new Date().toISOString(),
        isp: ipDetail.isp,
        organization: ipDetail.organization,
      });
      if (config.recent.length > MAX_SIZE) {
        config.recent.pop();
      }
    } catch (e) {
      console.log("lookupIp failed", e);
    }
  }
  console.log("config", config);
}

async function scanAll() {
  await loadDatabase();
  for (let index = 0; index < projects.length; index++) {
    const project = projects[index];
    try {
      await checkDNS(project.domains[0]);
    } catch (e) {
      console.log("error", e);
    }
    await wait(1000);
  }
  await saveDatabase();
}

async function main() {
  for (let index = 0; index < Infinity; index++) {
    try {
      await scanAll();
    } catch (e) {
      console.log("scan error", e);
    }
    await wait(60 * 1000 * 10);
  }
}

main();
