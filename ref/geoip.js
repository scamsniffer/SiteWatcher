const maxmind = require('maxmind');

maxmind.open('./GeoIP2-ISP.mmdb.enc').then((lookup) => {
  console.log(lookup.get('3.125.16.34'));

//   console.log(lookup.getWithPrefixLength('66.6.44.4'));
});