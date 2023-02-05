var express = require('express');
var router = express.Router();
var cron = require('node-cron');
const request = require('request');

var image_url = "";
var scientific_name = "";

var url = 'https://trefle.io/api/v1/plants?token=QbDbWsykkxWftsD3Tb6ItizBf6S_BA8lv2n5BXLb4XY&page=2';

cron.schedule('*/1 * * * * *', () => {
  let options = {json: true};
  request(url, options, (error, res, body) => {
      if (error) {
          return  console.log(error)
      };
      if (!error && res.statusCode == 200) {
          var nbdata = body.data.length
          // random number between 0 and nbdata
          var random = Math.floor(Math.random() * nbdata);
          // image_url
          image_url = body.data[random].image_url;
          // scientific_name
          scientific_name = body.data[random].scientific_name;
      };
  });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', image_url: image_url, scientific_name: scientific_name });
});

module.exports = router;
