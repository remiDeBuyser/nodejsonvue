var express = require('express');
var router = express.Router();
var cron = require('node-cron');
const request = require('request');

var image_url = "";
var scientific_name = "";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
