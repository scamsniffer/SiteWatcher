async function getHistory(domain) {
    const req = await fetch(
      "https://www.virustotal.com/ui/domains/" + domain + "/resolutions",
      {
        headers: {
          accept: "application/json",
          "accept-ianguage": "en-US,en;q=0.9,es;q=0.8",
          "accept-language": "en,ar;q=0.9,zh;q=0.8,zh-CN;q=0.7",
          "content-type": "application/json",
          "sec-ch-ua":
            '"Chromium";v="104", " Not A;Brand";v="99", "Google Chrome";v="104"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"macOS"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-app-version": "v1x111x2",
          "x-session-hash":
            "f02acad9e4e022aa8b7ab6348999661e21b6a83a78a1cf482526fc09422d3c46",
          "x-tool": "vt-ui-main",
          "x-vt-anti-abuse-header":
            "MTI3OTM5MzE3NjQtWkc5dWRDQmlaU0JsZG1scy0xNjYwMjc4MjYwLjk1NA==",
        },
        referrer: "https://www.virustotal.com/",
        referrerPolicy: "origin",
        body: null,
        method: "GET",
        mode: "cors",
        credentials: "include",
      }
    );
    return await req.json();
}

const projects = [
  // {
  //   name: "Uniswap",
  //   domains: ["app.uniswap.org"],
  // },
  // {
  //   name: "Curve",
  //   domains: ["curve.fi"],
  // },
  // {
  //   name: "Pancake Swap",
  //   domains: ["pancakeswap.finance"],
  // },
  // {
  //   name: "1inch",
  //   domains: ["app.1inch.io"],
  // },
  // {
  //   domains: ["gnosis-safe.io"],
  // },
  // {
  //   domains: ["synthetix.io"],
  // },
  // {
  //   domains: ["app.compound.finance"],
  // },
  // {
  //   domains: ["yearn.finance"],
  // },
  // {
  //   domains: ["app.multichain.org"],
  // },
  // {
  //   domains: ["looksrare.org"],
  // },
  // {
  //   domains: ["opensea.io"],
  // },
  // {
  //   domains: ["convexfinance.com"],
  // },
  // {
  //   domains: ["x2y2.io"],
  // },
  // {
  //   domains: ["gem.xyz"],
  // },
  // {
  //   domains: ["app.traitsniper.com"],
  // },
  // {
  //   domains: ["premint.xyz"],
  // },
  // {
  //   domains: ["icy.tools"],
  // },
  // {
  //   domains: ["stake.lido.fi"],
  // },
  // {
  //   domains: ["oasis.app"],
  // },
  // {
  //   domains: ["app.aave.com"],
  // },
  // {
  //   domains: ["defi.instadapp.io"],
  // },
  // {
  //   domains: ["app.balancer.fi"],
  // },
  // {
  //   domains: ["trade.dydx.exchange"],
  // },
  // {
  //   domains: ["app.cream.finance"],
  // },
  // {
  //   domains: ["quickswap.exchange"],
  // },
  // {
  //   domains: ["app.ribbon.finance"],
  // },
  // {
  //   domains: ["app.defisaver.com"],
  // },
  // {
  //   domains: ["stargate.finance"],
  // },
  // {
  //   domains: ["app.stakewise.io"],
  // },
  // {
  //   domains: ["app.badger.com"],
  // },
  // {
  //   domains: ["app.idle.finance"],
  // },
  // {
  //   domains: ["benddao.xyz"],
  // },
  // {
  //   domains: ["shibaswap.com"],
  // },
  // {
  //   domains: ["across.to"],
  // },
  // {
  //   domains: ["app.rari.capital"],
  // },
  // {
  //   domains: ["app.dodoex.io"],
  // },
  // {
  //   domains: ["app.element.fi"],
  // },
  // {
  //   domains: ["app.frax.finance"],
  // },
  // {
  //   domains: ["app.venus.io"],
  // },
  // {
  //   domains: ["app.alpacafinance.org"],
  // },
  // {
  //   domains: ["app.benqi.fi"],
  // },
  // {
  //   domains: ["gmx.io"],
  // },
  // {
  //   domains: ["trade.mango.markets"],
  // },
  // {
  //   domains: ["traderjoexyz.com"],
  // },
  // {
  //   domains: ["app.alpacafinance.org"],
  // },
  // {
  //   domains: ["app.bastionprotocol.com"],
  // },

  {
    domains: ["cbridge.celer.network"]
  }
];


(async () => {
    allData = [];
    for (let index = 0; index < projects.length; index++) {
      const project = projects[index];
      const result = await getHistory(project.domains[0]);
      project.result = result;
      allData.push(project)
      await new Promise((resolve) => {
        setTimeout(resolve, 4 * 1000);
      })
    }
})();