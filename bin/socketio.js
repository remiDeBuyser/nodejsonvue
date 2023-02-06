const request = require('request');
var cron = require('node-cron');
require('dotenv').config();

var name = "";
var image = "";
var next_page = 1;
cron.schedule('*/1 * * * * *', () => {
    request('https://trefle.io/api/v1/plants?token='+process.env.API_KEY_TREFLE+'&filter_not[image_url]=null&page='+next_page, { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        var nb = body.data.length;
        //random number between 0 and nb
        var rand = Math.floor(Math.random() * nb);
        image = body.data[rand].image_url;
        name = body.data[rand].scientific_name;
        next_page = Math.floor(Math.random() * body.links.last.split("page=")[1]);
    });
});

module.exports = (io) => {
    io.on("connection", (socket) => {
        console.log("a user connected");
        //send the name and image to the client
        socket.emit('plant', { name: name, image: image });

        socket.on("disconnect", () => {
            console.log("user disconnected");
        });
    });
};
