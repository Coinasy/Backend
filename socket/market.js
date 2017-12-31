module.exports = function(io) {
    const axios = require('axios')
    io.sockets.on('connection', function(socket) {
        console.log('socket is connected')
        // emit axios every 1 sec
        setInterval(function(){
            axios.get('https://api.coinmarketcap.com/v1/ticker/?limit=0').then(data => {
                socket.emit('market', data.data);
            }).catch(err => {
                console.log(err)
            })
        }, 1000);
    })
}