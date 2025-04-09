const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id: "ASFomEm1nZB-7wve2wr4Z4CxKUBp1alFz-c11T22vcPI_9tSgNkkQVcnUcULgXpRLK4-7e5A3v2cWurf",
  client_secret: "EF2-E88MoPnq6tiudcY4JAHwCfu-dpglBG2ke3vIFhc0nxrECV1X61gfZtw-C7w1TNrigmrplh_fOA7E",
});

module.exports = paypal;
