const request = require('request');
var cron = require('node-cron');


var name = "";
var image = "";
cron.schedule('*/1 * * * * *', () => {
    request('https://trefle.io/api/v1/plants?token=QbDbWsykkxWftsD3Tb6ItizBf6S_BA8lv2n5BXLb4XY&filter[image_url]=null', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        var nb = body.data.length;
        //random number between 0 and nb
        var rand = Math.floor(Math.random() * nb);
        image = body.data[rand].image_url;
        name = body.data[rand].common_name;
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
